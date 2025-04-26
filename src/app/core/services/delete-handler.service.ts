import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DeleteHandlerService {
  confirmationService = inject(ConfirmationService);
  http = inject(HttpClient);
  messageService = inject(MessageService);

  delete(endpoint: string): Observable<any> {
    return new Observable((observer) => {
      this.confirmationService.confirm({
        message: 'Silmek ister misiniz?',
        header: 'Sil',
        icon: 'pi pi-info-circle',
        rejectLabel: 'İptal',
        rejectButtonProps: {
          label: 'İptal',
          severity: 'secondary',
          outlined: true,
        },
        acceptButtonProps: {
          label: 'Sil',
          severity: 'danger',
        },

        accept: () => {
          this.http.delete(endpoint).subscribe((res) => {
            this.messageService.add({ severity: 'info', summary: 'Bilgi', detail: 'Silme işlemi başarılı!' });
            observer.next(res);
            observer.complete();
          });
        },
        reject: () => {
          observer.complete();
        }
      });
    })
  }
}
