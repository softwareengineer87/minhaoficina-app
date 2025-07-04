import { v4 as uuidv4 } from 'uuid';
import { Password } from '../Password';
import { sign, verify } from 'jsonwebtoken';
import { Email } from '../Email';

class Business {

  private email: Email;
  password: Password;

  constructor(
    readonly businessId: string,
    readonly name: string,
    email: string,
    password: string,
    readonly logo: string
  ) {
    if (name === '') {
      throw new Error('O nome é obrigatório.');
    }
    if (email === '') {
      throw new Error('O e-mail é obrigatório.');
    }
    if (password === '') {
      throw new Error('A senha é obrigatória.');
    }
    this.email = new Email(email);
    this.password = new Password(password);
  }

  static create(
    name: string,
    email: string,
    password: string,
    logo: string
  ) {
    const businessId = uuidv4();
    return new Business(
      businessId,
      name,
      email,
      password,
      logo
    );
  }

  generateToken() {
    const payload = {
      businessId: this.businessId,
      name: this.name,
      email: this.email.getValue(),
      logo: this.logo
    }
    const token = sign(payload, 'webdesign', { algorithm: 'HS256' });
    return token;
  }

  verifyToken(token: string) {
    return verify(token, 'webdesign');
  }

  getEmail() {
    return this.email.getValue();
  }

  getPassword() {
    return this.password.getValue();
  }

}

export { Business }

