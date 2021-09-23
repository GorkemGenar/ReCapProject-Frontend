import { Injectable } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import { UserModel } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  localStorage: Storage;
  currentUser: string = 'currentUser';

  constructor() {
    this.localStorage = window.localStorage;
  }

  get(key: string) {
    return this.localStorage.getItem(key);
  }

  set(key: string, value: string) {
    this.localStorage.setItem(key, value);
  }

  remove(key: string) {
    this.localStorage.removeItem(key);
  }

  clean() {
    this.localStorage.clear();
  }

  setCurrentUser(currentUserValue: UserModel) {
    localStorage.setItem(this.currentUser, JSON.stringify(currentUserValue));
  }

  setCurrentUserFromGoogle(currentUserValue: SocialUser) {
    localStorage.setItem(this.currentUser, JSON.stringify(currentUserValue));
  }

  getCurrentUser(): UserModel {
    return JSON.parse(localStorage.getItem(this.currentUser));
  }

  removeCurrentUser() {
    localStorage.removeItem(this.currentUser);
  }
}