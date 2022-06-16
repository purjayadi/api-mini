import { Resource } from './../../user/entities/resource.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(Resource, (faker) => {
  const resource = new Resource();
  resource.name = faker.name.firstName('male');

  return resource;
});
