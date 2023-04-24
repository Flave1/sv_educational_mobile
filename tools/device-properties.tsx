import NetInfo from '@react-native-community/netinfo';
export class NativeFeatures {
  static isInternetAvailable = async (): Promise<boolean> => {
    return await NetInfo.fetch().then(netInfo => {
      return netInfo.isInternetReachable == true
    });
  }
}
