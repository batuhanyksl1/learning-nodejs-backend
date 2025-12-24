/**
 * AppError - Özel hata sınıfı
 *
 * JavaScript'in yerleşik Error sınıfından türetilmiş özel bir hata sınıfı.
 * HTTP API'lerinde hem hata mesajı hem de HTTP status code'u taşımak için kullanılır.
 */
export class AppError extends Error {
  // HTTP status code'u (örn: 400, 404, 500)
  // Bu sayede hatanın türünü ve HTTP cevabını belirleyebiliriz
  statusCode: number;

  /**
   * Constructor - AppError nesnesi oluşturulurken çalışır
   *
   * @param message - Hata mesajı (kullanıcıya gösterilecek)
   * @param statusCode - HTTP status code (varsayılan: 400)
   *
   * Örnek kullanım:
   *   throw new AppError("Kullanıcı bulunamadı", 404);
   */
  constructor(message: string, statusCode = 400) {
    // super(message) = Error class'ının constructor'ını çağırır
    // Bu sayede Error'ın tüm özelliklerini (message, stack trace vb.) alırız
    // super() çağrılmadan this kullanılamaz!
    super(message);

    // this = "bu AppError nesnesi"
    // Bu AppError nesnesine statusCode özelliğini ekliyoruz
    // Böylece her AppError hem mesaj hem de status code taşır
    this.statusCode = statusCode;
  }
}
