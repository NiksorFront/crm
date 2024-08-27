declare function gettingData(endpoint: string): Promise<any>;
declare function sendingInfo(endpoint: string, infoObject: object): Promise<any>;
declare function deleteId(endpoint: string, id: string | number): Promise<any>;
export { gettingData, sendingInfo, deleteId };
