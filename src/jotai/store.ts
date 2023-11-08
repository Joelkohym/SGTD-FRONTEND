import {atomWithReset} from "jotai/utils"
import { AlertType } from "../lib/constants";
import { atom } from "jotai";

const popupAtom = atomWithReset({isOpen: false, message: "", type: AlertType.Error, btnHandler:()=>{}})
const loaderAtom = atom<boolean>(false)

export { 
  popupAtom, 
  loaderAtom,
};