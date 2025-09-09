import request from 'supertest';
import app from '../app';

describe('API Endpoints', () => {
  it('should return a list of campaigns', async () => {
    const response = await request(app).get('/api/campaigns');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should create a new campaign', async () => {
    const newCampaign = {
      title: 'Test Campaign',
      description: 'This is a test campaign for SMEs.',
      fundingGoal: 100000,
      duration: 30,
    };

    const response = await request(app)
      .post('/api/campaigns')
      .send(newCampaign);

    expect(response.status).toBe(201);
    expect(response.body.title).toBe(newCampaign.title);
  });

  it('should return a specific campaign', async () => {
    const campaignId = '1'; // Replace with a valid campaign ID
    const response = await request(app).get(`/api/campaigns/${campaignId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(campaignId);
  });

  it('should return 404 for a non-existing campaign', async () => {
    const response = await request(app).get('/api/campaigns/999');
    expect(response.status).toBe(404);
  });

  it('should authenticate user', async () => {
    const userCredentials = {
      email: 'test@example.com',
      password: 'password123',
    };

    const response = await request(app)
      .post('/api/auth/login')
      .send(userCredentials);

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});