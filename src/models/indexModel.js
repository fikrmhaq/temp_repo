import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://dev.tikom.elemen.my.id/asset/',
    // baseURL: 'http://192.168.100.37:3650/',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

const asset_rak = {
    getAssetRak() {
        return apiClient.get('/asset_rak');
    },
    postAssetRak(data) {
        return apiClient.post('/asset_rak', data);
    },
    getOneAssetRak(id) {
        return apiClient.get(`/asset_rak/${id}`);
    },
    patchAssetRak(id, data) {
        return apiClient.patch(`/asset_rak/${id}`, data);
    },
    deleteAssetRak(id) {
        return apiClient.delete(`/asset_rak/${id}`);
    }
}

const asset_ruangan = {
    getAssetRuangan() {
        return apiClient.get('/asset_ruangan');
    },
    postAssetRuangan(data) {
        return apiClient.post('/asset_ruangan', data);
    },
    getOneAssetRuangan(id) {
        return apiClient.get(`/asset_ruangan/${id}`);
    },
    patchAssetRuangan(id, data) {
        return apiClient.patch(`/asset_ruangan/${id}`, data);
    },
    deleteAssetRuangan(id) {
        return apiClient.delete(`/asset_ruangan/${id}`);
    }
}

const core_kontrak = {

}

export {
    asset_rak,

}