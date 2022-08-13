import { DashboardTransactionDTO } from './../dto/dashboard.dto';
import { Order, Status } from './../order/entities/order.entity';
import { IResponse, IPaginate } from 'src/interface/response.interface';
import { Inject, Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { FilterDto } from 'src/dto/filters.dto';
import { Between, Repository } from 'typeorm';
import { Customer } from 'src/customer/entities/customer.entity';
import moment from 'moment';

@Injectable()
export class DashboardService {
  constructor(
    @Inject('SCHEDULE_REPOSITORY')
    private readonly schedule: Repository<Schedule>,
    @Inject('CUSTOMER_REPOSITORY')
    private readonly customer: Repository<Customer>,
    @Inject('ORDER_REPOSITORY')
    private readonly order: Repository<Order>,
  ) {}

  async getSchedule(payload: FilterDto): Promise<IResponse | IPaginate> {
    try {
      const { date } = payload;
      const data = await this.schedule.find({
        ...(date
          ? {
              where: [
                date && {
                  date: date,
                },
              ],
            }
          : {}),
      });
      return { data, error: null, status: HttpStatus.OK };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getWidget(): Promise<IResponse | IPaginate> {
    const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
    const endOfMonth = moment().endOf('month').format('YYYY-MM-DD');
    const startOfLastMonth = moment()
      .subtract(1, 'months')
      .startOf('month')
      .format('YYYY-MM-DD');
    const endOfLastMonth = moment()
      .subtract(1, 'months')
      .endOf('month')
      .format('YYYY-MM-DD');
    try {
      const thisMonth = await this.customer.findAndCount({
        where: {
          joinDate: Between(
            startOfMonth as unknown as Date,
            endOfMonth as unknown as Date,
          ),
        },
      });
      const lastMonth = await this.customer.findAndCount({
        where: {
          joinDate: Between(
            startOfLastMonth as unknown as Date,
            endOfLastMonth as unknown as Date,
          ),
        },
      });
      const activeCustomer = await this.customer.findAndCount({
        relations: ['orders'],
        where: {
          orders: {
            date: Between(
              startOfMonth as unknown as Date,
              endOfMonth as unknown as Date,
            ),
            status: Status.COMPLETED,
          },
        },
      });
      const activeLastMonthCustomer = await this.customer.findAndCount({
        relations: ['orders'],
        where: {
          orders: {
            date: Between(
              startOfLastMonth as unknown as Date,
              endOfLastMonth as unknown as Date,
            ),
            status: Status.COMPLETED,
          },
        },
      });
      const countOrder = await this.order.findAndCount({
        where: {
          date: Between(
            startOfMonth as unknown as Date,
            endOfMonth as unknown as Date,
          ),
          status: Status.COMPLETED,
        },
      });

      const countLastMonthOrder = await this.order.findAndCount({
        where: {
          date: Between(
            startOfLastMonth as unknown as Date,
            endOfLastMonth as unknown as Date,
          ),
          status: Status.COMPLETED,
        },
      });

      let orderTotal = 0;
      let lastMonthOrderTotal = 0;
      countOrder[0].map((val) => {
        orderTotal += parseInt(val.total as unknown as string);
      });
      countLastMonthOrder[0].map((val) => {
        lastMonthOrderTotal += parseInt(val.total as unknown as string);
      });

      const data = {
        totalCustomer: {
          thisMonth: thisMonth[1],
          lastMonth: lastMonth[1],
        },
        activeCustomer: {
          thisMonth: activeCustomer[1],
          lastMonth: activeLastMonthCustomer[1],
        },
        totalOrder: {
          thisMonth: countOrder[1],
          lastMonth: countLastMonthOrder[1],
        },
        totalOrderReduce: {
          thisMonth: orderTotal,
          lastMonth: lastMonthOrderTotal,
        },
      };
      return { data, error: null, status: HttpStatus.OK };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTransaction(payload: DashboardTransactionDTO) {
    try {
      const prevMonth = moment(
        new Date(`"${payload.year}-${payload.month}-1"`),
      ).startOf('month');
      const prevMonthDays = prevMonth.daysInMonth();

      // Array to collect dates of previous month
      const prevMonthDates = [];

      for (let i = 0; i < prevMonthDays; i++) {
        // Calculate moment based on start of previous month, plus day offset
        const prevMonthDay = prevMonth
          .clone()
          .add(i, 'days')
          .format('YYYY-MM-DD');
        const day = prevMonth.clone().add(i, 'days').format('DD');
        let totalOrder = 0;
        let totalPendingOrder = 0;
        const order = await this.order.findBy({
          date: prevMonthDay as unknown as Date,
          status: Status.COMPLETED,
        });
        const pendingOrder = await this.order.findBy({
          date: prevMonthDay as unknown as Date,
          status: Status.PO,
        });
        order.map((val) => {
          totalOrder += parseInt(val.total as unknown as string);
        }),
          pendingOrder.map((val) => {
            totalPendingOrder += parseInt(val.total as unknown as string);
          });
        prevMonthDates.push({
          name: day,
          order: totalOrder,
          pendingOrder: totalPendingOrder,
        });
      }

      return {
        data: prevMonthDates,
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
