import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://192.168.100.37:3750/',
    // baseURL: 'http://192.168.100.37:3650/',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})
                                                                                                            
export default {
    getRincian(mst, offset = 0) {
        if (mst == '' || mst == null) return apiClient.get('/rincian_asset');
        return apiClient.get(`/rincian_asset?mst_rincian_asset=${mst}&offset=${offset}`);
    },
    getOneRincian(id) {
        return apiClient.get(`/rincian_asset/${id}`);
    },
    getRuangan(id = null) {
        if (id != null) return apiClient.get(`/core_ruangan/${id}`);
        return apiClient.get('/core_ruangan');
    },
    postRuangan(data) {
        return apiClient.post('/core_ruangan', data);
    },
    deleteRuangan(id){
        return apiClient.delete(`/core_ruangan/${id}`);
    },
    updateRuangan(id, data) {
        return apiClient.patch(`/core_ruangan/${id}`, data);
    },
    getCoreBarang() {
        return apiClient.get('/core_barang');
    },
    postBarang(data) {
        return apiClient.post('/core_barang', data);
    },
    editBarang(id, data) {
        return apiClient.patch(`/core_barang/${id}`, data);
    },
    deleteBarang(id) {
        return apiClient.delete(`/core_barang/${id}`);
    },
    getVendor() {
        return apiClient.get('/vendor');
    },
    postVendor(data) {
        return apiClient.post('/vendor', data);
    },
    getSupplier() {
        return apiClient.get('/supplier');
    },
    postSupplier(data) {
        return apiClient.post('/supplier', data);
    },
    getKontrak(id = null) {
        if (id != null) return apiClient.get(`/core_kontrak/${id}`);
        return apiClient.get('/core_kontrak');
    },
    getSupplier() {
        return apiClient.get('/supplier');
    },
    getDetailBarang() {
        return apiClient.get('/detail_barang');
    },
    postKontrak(data) {
        return apiClient.post('/core_kontrak', data);
    },
    getJenisKontrak() {
        return apiClient.get('/jenis_kontrak');
    },
    getBarang() {
        return apiClient.get('/barang');
    },
    getAnggaran() {
        return apiClient.get('/sumber_anggaran');
    },
    getDetailKontrak() {
        return apiClient.get('/detail_kontrak');
    },
    postDetailKontrak(data) {
        return apiClient.post('/detail_kontrak', data);
    },
    patchBarang(id, data) {
        return apiClient.patch(`/core_barang/${id}`, data);
    },
    getAssetRuangan() {
        return apiClient.get('/asset_ruangan');
    },
    postAssetRuangan(data) {
        return apiClient.post('/asset_ruangan', data);
    },
    patchAssetRuangan(id, data) {
        return apiClient.patch(`/asset_ruangan/${id}`, data);
    },
    deleteAssetRuangan(id) {
        return apiClient.delete(`/asset_ruangan/${id}`);
    },
    deleteKontrak(id) {
        return apiClient.delete(`/core_kontrak/${id}`);
    },
    patchKontrak(id, data) {
        return apiClient.patch(`/core_kontrak/${id}`, data);
    },
    patchRuangan(id, data) {
        return apiClient.patch(`/core_ruangan/${id}`, data);
    },
    patchVendor(id, data) {
        return apiClient.patch(`/vendor/${id}`, data);
    },
    postCorePeminjaman(data) {
        return apiClient.post('/core_peminjaman', data);
    },
    postDetailPeminjaman(data) {
        return apiClient.post('/detail_peminjaman', data);
    },
}