import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-how-it-work',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './how-it-work.component.html',
  styleUrl: './how-it-work.component.css'
})
export class HowItWorkComponent {
  listStep: {
    id: number;
    img: string;
    title: string;
    content: string;
    color: string;
  }[] = [
    {
      id: 1,
      img: "../../../assets/images/HIW1img.webp",
      title: "Lọc & Khám phá",
      content: "Lọc và đề xuất giúp bạn dễ dàng tìm thấy dễ dàng",
      color: "text-red-800 bg-red-100",
    },
    {
      id: 2,
      img: "../../../assets/images/HIW2img.webp",
      title: "Thêm vào giỏ hàng",
      content: "Dễ dàng chọn đúng mặt hàng và thêm vào giỏ hàng",
      color: "text-indigo-800 bg-indigo-100",
    },
    {
      id: 3,
      img: "../../../assets/images/HIW3img.webp",
      title: "Chuyển phát nhanh",
      content: "Nhà vận chuyển sẽ xác nhận và gửi hàng nhanh chóng tới bạn",
      color: "text-yellow-800 bg-yellow-100",
    },
    {
      id: 4,
      img: "../../../assets/images/HIW4img.webp",
      title: "Trải nghiệm sản phẩm",
      content: "Hãy vui vẻ và trải nghiệm những sản phẩm chất lượng 5 sao",
      color: "text-purple-800 bg-purple-100",
    },
  ];

}
