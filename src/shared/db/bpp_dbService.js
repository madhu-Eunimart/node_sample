import BppOrderModel from './bpp_order.js';
import { getProviderById } from './dbService.js';
// import BppBapUserCart from './bpp_bap_user_cart.js';

const CreateBppOrder = async (data) => {
    let provider_id = data?.provider?.id
    let provider_data = await getProviderById(provider_id)
    data.CreatedBy=provider_data?.company_id
    return await BppOrderModel.create(data);
};

const UpdateBppOrder = async (query, data) => {
    return await BppOrderModel.findOneAndUpdate(query, data,{new: true});
};

const DeleteBppOrder = async (query) => {
    return await BppOrderModel.deleteOne(query);
};

const GetBppOrder = async (query) => {
    return await BppOrderModel.findOne(query).lean();
};
const ListBppOrder = async () => {
    console.log("service---------------")
    return await BppOrderModel.find().lean();
};

const UpsertBppOrder = async (query, data) => {
    return await BppOrderModel.findOneAndUpdate(query, data, {upsert: true});
}

//========================= user cart =================================================
const UpsertBppBapUserCartOrder = async (query, data) => {
    return await BppBapUserCart.findOneAndUpdate(query, data, {upsert: true});
}
const GetBppBapUserCartOrder = async (query) => {
    return await BppBapUserCart.findOne(query).lean();
};
const ListBppBapUserCartOrder = async (query) => {
    return await BppBapUserCart.find(query).lean();
};

export {
    CreateBppOrder,
    GetBppOrder,
    UpdateBppOrder,
    DeleteBppOrder,
    ListBppOrder,
    UpsertBppOrder,

    // UpsertBppBapUserCartOrder,
    // GetBppBapUserCartOrder,
    // ListBppBapUserCartOrder,
}