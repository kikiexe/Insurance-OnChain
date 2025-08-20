// 1. Impor ABI dari file yang baru kita buat
import factoryAbi from './abis/PolicyFactory.abi.json';
import idrxAbi from './abis/IDRX.abi.json';

// 2. Definisikan alamat kontrak yang sudah di-deploy
const factoryAddress = "0x9A191F7eEc9A0b9EDAf12a3fC1d8769ec624D41e";
const idrxAddress = "0x3f8c3343B150A496f7437d8e6B703944d1DfE402";

// 3. Gabungkan alamat dan ABI ke dalam satu objek untuk kemudahan
export const factoryContractConfig = {
  address: factoryAddress,
  abi: factoryAbi,
};

export const idrxContractConfig = {
  address: idrxAddress,
  abi: idrxAbi,
};