import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { AccessToken } from 'livekit-server-sdk';

const router = Router();

// Mock database - em produção usar Prisma
const rooms = new Map<string, any>();

// POST /api/rooms - Create a new room
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, scheduledAt, hostId } = req.body;
    
    const roomId = uuidv4().substring(0, 8);
    const room = {
      id: roomId,
      title: title || `Reunião ${roomId}`,
      scheduledAt: scheduledAt || null,
      hostId: hostId || 'anonymous',
      createdAt: new Date().toISOString(),
      status: 'pending',
    };

    rooms.set(roomId, room);

    // Em produção: criar sala no LiveKit via API
    console.log(`Room created: ${roomId}`);

    res.status(201).json({
      success: true,
      data: room,
    });
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ error: 'Failed to create room' });
  }
});

// GET /api/rooms/:id - Get room details
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const room = rooms.get(id);

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.json({
      success: true,
      data: room,
    });
  } catch (error) {
    console.error('Error getting room:', error);
    res.status(500).json({ error: 'Failed to get room' });
  }
});

// POST /api/rooms/:id/token - Generate LiveKit token for participant
router.post('/:id/token', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, identity } = req.body;

    const room = rooms.get(id);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    const apiKey = process.env.LIVEKIT_API_KEY || 'devkey';
    const apiSecret = process.env.LIVEKIT_API_SECRET || 'secret';

    const at = new AccessToken(apiKey, apiSecret, {
      identity: identity || `user-${Date.now()}`,
      name: username || 'Participant',
      ttl: '1h',
    });

    at.addGrant({
      roomJoin: true,
      room: id,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
    });

    const token = await at.toJwt();

    res.json({
      success: true,
      token,
      roomUrl: process.env.LIVEKIT_URL || 'ws://localhost:7880',
    });
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).json({ error: 'Failed to generate token' });
  }
});

// DELETE /api/rooms/:id - Delete/end a room
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    rooms.delete(id);

    res.json({
      success: true,
      message: 'Room deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ error: 'Failed to delete room' });
  }
});

export default router;
