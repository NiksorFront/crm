declare function gettingData(endpoint: string): Promise<any>;
declare function gettingDataCostil(endpoint: string): Promise<any>;
declare function sendingInfo(endpoint: string, infoObject: object): Promise<any>;
declare function sendingInfoFromButton(url: string, infoObject: object): Promise<any>;
declare function deleteData(endpoint: string, infoObject: object): Promise<any>;
export { gettingData, sendingInfo, sendingInfoFromButton, deleteData, gettingDataCostil, };
