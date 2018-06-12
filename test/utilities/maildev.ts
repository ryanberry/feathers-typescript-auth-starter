import * as Maildev from 'maildev'
import { Subject } from 'rxjs'

class MailDevService {
  private static _instance: MailDevService

  public static get getInstance() {
    return this._instance || (this._instance = new this())
  }

  private maildev
  private maildevOptions: MailDevOptions = {
    disableWeb: true,
    silent: true,
    smtp: 1024,
  }
  public newMail: Subject<any> = new Subject()

  constructor() {
    this.maildev = new Maildev(this.maildevOptions)
    this.maildev.on('new', email => this.newMail.next(email))
  }

  public listen() {
    this.maildev.listen()
  }

  public stopListening() {
    this.maildev.close()
  }
}

export default MailDevService.getInstance
