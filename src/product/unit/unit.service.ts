import { IResponse } from '../../utils/interfaces/response.interface';
import { UnitRepositoryInterface } from './../../repository/interface/product.repository.interface';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUnitDto, FindUnitDto } from '../dto/unit.dto';

@Injectable()
export class UnitService {
    constructor(
        @Inject('UnitRepositoryInterface')
        private readonly repository: UnitRepositoryInterface,

    ) { }

    async findAll(payload: FindUnitDto): Promise<IResponse> {
        try {
            const { offset, limit } = payload;
            const Units = await this.repository.findWithRelations({
                ...limit && { take: limit },
                ...offset && { skip: offset }
            });

            return { data: Units, error: null, status: HttpStatus.OK };
        } catch (error) {
            return { message: "Unable to get Unit", error: error.message, status: HttpStatus.INTERNAL_SERVER_ERROR };
        }
    }

    async create(payload: CreateUnitDto): Promise<IResponse> {
        try {
            await this.repository.create({
                ...payload
            });
            return { message: "Create Unit successfully", error: null, status: HttpStatus.OK };
        } catch (error) {
            return { message: "Unable to create Unit", error: error.message, status: HttpStatus.INTERNAL_SERVER_ERROR };
        }
    }

    async findOne(id: string): Promise<IResponse> {
        try {
            const Unit = await this.repository.findOneById(id);
            if (!Unit) {
                return { message: "Unit not Found", error: null, status: HttpStatus.NOT_FOUND };
            }
            return { data: Unit, error: null, status: HttpStatus.OK };
        } catch (error) {
            return { message: "Unable to get Unit", error: error.message, status: HttpStatus.INTERNAL_SERVER_ERROR };
        }
    }

    async update(id: string, payload: Partial<CreateUnitDto>): Promise<IResponse> {
        try {
            const Unit = await this.repository.findOneById(id);
            if (!Unit) {
                return { data: null, error: ['Unit not Found'], status: HttpStatus.NOT_FOUND };
            }
            await this.repository.update(id, payload);
            return { message: "Update Unit successfully", error: null, status: HttpStatus.OK };
        } catch (error) {
            return { message: "Unable to update Unit", error: error.message, status: HttpStatus.INTERNAL_SERVER_ERROR };
        }
    }

    async remove(id: string): Promise<IResponse> {
        try {
            const Unit = await this.repository.findOneById(id);
            if (!Unit) {
                return { data: null, error: ['Unit not Found'], status: HttpStatus.NOT_FOUND };
            }
            await this.repository.remove(id);
            return { message: "Delete Unit successfully", error: null, status: HttpStatus.OK };
        } catch (error) {
            return { message: "Unable to delete Unit", error: error.message, status: HttpStatus.INTERNAL_SERVER_ERROR };
        }
    }

}
