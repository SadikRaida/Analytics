import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Users } from "./users.entity";
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import {MailService} from "../../mail/mail.service";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private readonly mailService: MailService
  ) { }

  /**
   * Get Specific User based on his ID
   *
   * @param id
   * @returns {Promise<User>} Found user
   */
  async findOne(id: string): Promise<Users> {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  /**
   * Get a specific user by Email
   *
   * @param email
   * @returns {Promise<User | undefined>} Found User, or undefined if user doesn't exists
   */
  async findByEmail(email: string): Promise<Users | undefined> {
    const user = await this.userRepository.findOne({
      where: {
        email: email
      }
    });

    return user;
  }

  /**
   * Get a specific user by either his email or username
   *
   * @param {string} identifier Email or Username
   * @returns {Promise<User | undefined>} Found User, or undefined if user doesn't exists
   */
  async findByIdentifier(identifier: string): Promise<Users | undefined> {

    const user = await this.userRepository.findOne({
      //check if identifier is an email or a username
      where: [

        {
          email: identifier
        }
      ]
    });


    return user;
  }

  /**
   * Find all users
   *
   * @returns {Promise[User]} All users
   */
  async findAll(): Promise<Users[]> {
    return await this.userRepository.find();
  }

  /**
   * Creates User
   *
   * @param {CreateUserDto} createUserDto
   * @returns {Promise<User>} Promise User Created
   */
  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    const user = new Users();
    user.email = createUserDto.email;
    user.password = await bcrypt.hash(createUserDto.password, 10);
    user.society = createUserDto.society;
    user.url = createUserDto.url;
    user.role = createUserDto.role ? createUserDto.role : 'ROLE_WEBMASTER';
    return this.userRepository.save(user);
  }



  /**
   * Update User
   *
   * @param {number} id
   * @param {UpdateUserDto} updateUserDto
   * @returns {Promise<Users>} Promise User Updated
   */
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<Users> {
    const user = await this.userRepository.findOneBy({ id });
    user.email = updateUserDto.email;
    user.password = await bcrypt.hash(updateUserDto.password, 10);
    user.society = updateUserDto.society;
    user.role = updateUserDto.role
    user.url = updateUserDto.url;
    return this.userRepository.save(user);
  }

  /**
   * Deletes User
   *
   * @param {number} id
   * @returns {Promise<User>} Promise User Deleted
   */
  async deleteUser(id: string): Promise<Users> {
    const user = await this.userRepository.findOneBy({ id });
    if(!user) throw new NotFoundException('User not found');

    return this.userRepository.remove(user);
  }


  /**
   * Verify that user can make request because he is the owner of the entity
   *
   * @param {string} currentUserNickname
   * @param {string} requestedUserId
   *
   * @returns {Promise<boolean>}
   */
  async checkOwner(currentUserNickname: string, requestedUserId: string): Promise<boolean> {
    const currentUser = await this.findByIdentifier(currentUserNickname);
    const requestedUser = await this.findOne(requestedUserId);

    return currentUser === requestedUser;
  }

  async verifyUser(id: string): Promise<Users> {
    const user = await this.userRepository.findOneBy({ id });
    if (user.isVerified === true) throw new NotFoundException('User already verified');
    const apikey = uuidv4();
    user.isVerified = true;
    user.apikey = apikey;
    await this.mailService.sendMail({
        to: user.email,
        subject: 'Votre compte a été validé',
        text: `Votre compte a été validé, vous pouvez désormais vous connecter à l'application avec votre email et le mot de passe que vous avez choisi.
            <br>
            <br>
            Voici votre Clé d'api qu'il vous faudra utiliser dans votre application : <b>${apikey}</b>
        `
    });
    return this.userRepository.save(user);
  }

  async findByApiKey(apiKey: string): Promise<Users> {
    return await this.userRepository.findOne({ where: { apikey: apiKey } });
  }
}
