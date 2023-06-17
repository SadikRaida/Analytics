import { Injectable } from '@nestjs/common';
import { CreateSdkDto } from './dto/create-sdk.dto';
import { UpdateSdkDto } from './dto/update-sdk.dto';
import axios from 'axios';

@Injectable()
export class SdkService {

  private serverUrl = 'http://localhost:3333'; // Remplacez par l'URL de votre serveur

  sendEvent(event: any): Promise<any> {
    return axios.post(`${this.serverUrl}/event`, event);
  }

  create(createSdkDto: CreateSdkDto) {
    return 'This action adds a new sdk';
  }

  findAll() {
    return `This action returns all sdk`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sdk`;
  }

  update(id: number, updateSdkDto: UpdateSdkDto) {
    return `This action updates a #${id} sdk`;
  }

  remove(id: number) {
    return `This action removes a #${id} sdk`;
  }
}
