import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { LocalStorageEnum } from "../enum/local-storage.enum";
import { EncryptionDecryptionService } from "./encryption-decryption.service";
@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  private ls = window.localStorage;

  constructor(
    private encryptionDecryptionService: EncryptionDecryptionService,
  ) {}

  /**
   * save data to local storage
   * encrypt data before saving
   * @param key
   * @param value
   * @returns true
   */
  public setItem(key: LocalStorageEnum, value: any) {
    value = environment.production
      ? this.encryptionDecryptionService.set(JSON.stringify(value))
      : JSON.stringify(value);

    this.ls.setItem(key, value);
    return true;
  }

  /**
   * get data to local storage
   * decrypt data before returning
   * @param key
   * @returns true
   */
  public getItem(key: LocalStorageEnum) {
    const value = environment.production
      ? this.encryptionDecryptionService.get(this.ls.getItem(key))
      : this.ls.getItem(key);
    try {
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  }

  /**
   * Remove single item from local storage
   * @param key
   * @returns
   */
  public removeItem(key: LocalStorageEnum) {
    this.ls.removeItem(key);
    return true;
  }

  /** Clear local storage */
  public clear() {
    this.ls.clear();
  }
}
