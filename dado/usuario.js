import Dado from './generico'
import sha256 from 'crypto-js/sha256';
import { setCookie } from 'cookies-next';
import { hasCookie } from 'cookies-next';
import { deleteCookie } from 'cookies-next';
import { getCookie } from 'cookies-next';

export default class Usuario {

  static autenticar(pNome, pSenha) {
    var senha256 = sha256(pSenha)
    return Dado.salvar({ nome: pNome, senha: "" + senha256 }, "usuario")
  }
  static autenticado() {
    return hasCookie('usuario');
  }
  static sair() {
    deleteCookie('usuario');
    deleteCookie('empresa');
  }
  static getUsuario() {
    return getCookie('usuario')
  }
  static getEmpresa() {
    return getCookie('empresa')

  }
  static setUsuario(usuario) {
    setCookie('usuario', usuario);
  }
  static setEmpresa(empresa) {
    setCookie('empresa', empresa);
  }
}