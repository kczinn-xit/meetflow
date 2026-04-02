import { Router, Request, Response } from 'express';

const router = Router();

// POST /api/webhooks/livekit - Handle LiveKit webhooks
router.post('/livekit', async (req: Request, res: Response) => {
  try {
    const event = req.body;
    console.log('LiveKit webhook received:', event);

    // Process different event types
    switch (event.event) {
      case 'room_started':
        console.log(`Room started: ${event.room?.name}`);
        break;
      case 'room_finished':
        console.log(`Room finished: ${event.room?.name}`);
        break;
      case 'participant_joined':
        console.log(`Participant joined: ${event.participant?.identity}`);
        break;
      case 'participant_left':
        console.log(`Participant left: ${event.participant?.identity}`);
        break;
      default:
        console.log(`Unknown event type: ${event.event}`);
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Failed to process webhook' });
  }
});

export default router;
