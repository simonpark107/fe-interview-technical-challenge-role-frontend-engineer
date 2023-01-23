import { Address } from '../types/types';

export function formatAddress(address: Address): string {
  let addressString = '';
  if (address.line1) {
    addressString += address.line1;
  }
  if (address.line2) {
    addressString += ', ' + address.line2;
  }
  if (address.city) {
    addressString += ', ' + address.city;
  }
  if (address.state) {
    addressString += ', ' + address.state;
  }
  if (address.postalCode) {
    addressString += ' ' + address.postalCode;
  }
  return addressString;
}
