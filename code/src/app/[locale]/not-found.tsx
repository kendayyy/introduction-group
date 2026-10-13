import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";

export default function LocaleNotFound() {
  return (
    <Container className="section-space grid gap-4">
      <h1>Không tìm thấy trang / Page not found</h1>
      <p>Đường dẫn không tồn tại trên website Web2Go.</p>
      <Link href="/vi">VI</Link>
      <Link href="/en">EN</Link>
    </Container>
  );
}
