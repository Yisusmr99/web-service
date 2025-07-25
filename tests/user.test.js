const request = require('supertest');
const app = require('../app');

describe('API /api/users', () => {
  it('GET /api/users - debe devolver lista de usuarios', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'success');
    expect(Array.isArray(res.body.data)).toBeTruthy();
  });

  it('POST /api/users - debe crear un nuevo usuario', async () => {
    const newUser = {
      first_name: "Test",
      last_name: "User",
      email: `testuser${Date.now()}@email.com`,
      pass: "123456"
    };

    const res = await request(app)
      .post('/api/users')
      .send(newUser)
      .set('Accept', 'application/json');

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('status', 'success');
    expect(res.body.data).toMatchObject({
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email
    });
  });

  it('POST /api/users - debe fallar si faltan campos requeridos', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({}) // sin ningún campo
      .set('Accept', 'application/json');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('status', 'error');
    expect(res.body.message).toMatch(/requeridos/i);
  });

  it('POST /api/users - debe fallar si email está duplicado', async () => {
    const emailDuplicado = `dup${Date.now()}@mail.com`;

    // Crear el usuario inicialmente
    await request(app)
      .post('/api/users')
      .send({
        first_name: "Dup",
        last_name: "User",
        email: emailDuplicado,
        pass: "123456"
      })
      .set('Accept', 'application/json');

    // Intentar crearlo de nuevo
    const res = await request(app)
      .post('/api/users')
      .send({
        first_name: "Dup",
        last_name: "User2",
        email: emailDuplicado,
        pass: "123456"
      })
      .set('Accept', 'application/json');

    expect(res.statusCode).toEqual(409);
    expect(res.body).toHaveProperty('status', 'error');
    expect(res.body.message).toMatch(/ya está registrado/i);
  });
});
