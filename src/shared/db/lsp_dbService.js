import LspOrderModel from './lsp_order.js';
import LspBapUserCart from './lsp_bap_user_cart.js';

const CreateLspOrder = async (data) => {
    return await LspOrderModel.create(data);
};

const UpdateLspOrder = async (query, data) => {
    return await LspOrderModel.findOneAndUpdate(query, data);
};

const DeleteLspOrder = async (query) => {
    return await LspOrderModel.deleteOne(query);
};

const GetLspOrder = async (query) => {
    return await LspOrderModel.findOne(query).lean();
};
const ListLspOrder = async (query) => {
    return await LspOrderModel.find(query).lean();
};

const UpsertLspOrder = async (query, data) => {
    return await LspOrderModel.findOneAndUpdate(query, data, {upsert: true});
}

//========================= user cart =================================================
const UpsertLspBapUserCartOrder = async (query, data) => {
    return await LspBapUserCart.findOneAndUpdate(query, data, {upsert: true});
}
const GetLspBapUserCartOrder = async (query) => {
    return await LspBapUserCart.findOne(query).lean();
};
const ListLspBapUserCartOrder = async (query) => {
    return await LspBapUserCart.find(query).lean();
};

export {
    CreateLspOrder,
    GetLspOrder,
    UpdateLspOrder,
    DeleteLspOrder,
    ListLspOrder,
    UpsertLspOrder,

    UpsertLspBapUserCartOrder,
    GetLspBapUserCartOrder,
    ListLspBapUserCartOrder,
}