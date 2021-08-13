import { ClientAlreadyExistsError } from './errors';
import { ClientCompanyModel, ClientIndividualModel, ClientTypes } from './schema';

export const getClientByNameAction = async (name) => {
  const result = await Promise.all([
    ClientIndividualModel.findOne({ fullName: name }),
    ClientCompanyModel.findOne({ companyName: name }),
  ]);
  return result[0] || result[1];
};

export const createClientAction = async (client) => {
  if (await getClientByNameAction(client.name)) {
    return Promise.reject(new ClientAlreadyExistsError());
  } else if (client.type === ClientTypes.Individual) {
    return ClientIndividualModel.create({
      type: client.type,
      country: client.country,
      email: client.email,
      phone: client.phone,
      language: client.language,
      fullName: client.name,
    });
  }
  return ClientCompanyModel.create({
    type: client.type,
    country: client.country,
    email: client.email,
    phone: client.phone,
    language: client.language,
    companyName: client.name,
  });
};

export const getAllClientsAction = async () => {
  const result = await Promise.all([ClientIndividualModel.find(), ClientCompanyModel.find()]);
  return result[0].concat(result[1]);
};

export const getClientByIdAction = async (id) => {
  const result = await Promise.all([
    ClientIndividualModel.findById(id),
    ClientCompanyModel.findById(id),
  ]);
  return result[0] || result[1];
};

export const updateClientDataAction = async (id, client) => {
  const clientIndividual = await ClientIndividualModel.findByIdAndUpdate(
    id,
    {
      $set: {
        country: client.country,
        email: client.email,
        phone: client.phone,
        language: client.language,
        fullName: client.name,
      },
    },
    { runValidators: true, new: true }
  );
  const clientCompany = await ClientCompanyModel.findByIdAndUpdate(
    id,
    {
      $set: {
        country: client.country,
        email: client.email,
        phone: client.phone,
        language: client.language,
        companyName: client.name,
      },
    },
    { runValidators: true, new: true }
  );

  return clientIndividual || clientCompany;
};

export const deleteClientAction = (id) =>
  Promise.all([
    ClientIndividualModel.findByIdAndDelete(id),
    ClientCompanyModel.findByIdAndDelete(id),
  ]);
