---
title: Devlog || Gemboard - Infinity canvas
description: Tôi cố gắng tạo ra một một bảng vô tận!
toc: true
authors: ["definev"]
tags: ["dart", "flutter", "devlog"]
categories: []
series: ["Gemboard - Devlog"]
date: 2024-08-27T10:09:32+07:00
lastmod: 2024-08-27T10:09:32+07:00
featuredVideo:
featuredImage:
draft: true
---

Tôi sử dụng Flutter cho dự án này, trước đó tôi đã từng làm qua những UI như `Stack` kết hợp với `InteractiveViewer` và các UI dạng cuộn 2 chiều như dạng bảng tính. Tuy nhiên các loại UI này đều có nhược điểm là toạ độ của các thành phần trong view phải > 0.

Lấy ví dụ:
- Widget A ở toạ độ (độ, 20) thì khi đó ta mới có thể thực hiện các gesture trong widget đó.
- Nếu Widget B ở toạ độ (-10, -30) Khi dùng `Stack` kết hợp với `InteractiveViewer` phần hiển thị của widget đó vẫn được hiển thị lên tuy nhiên nó không thể thực hiện các gesture (onTap, onLongPressed, etc..) được do thuật toán tìm `hitTest` của flutter chỉ hoạt động trong vùng hiển thị của Widget cha.


Rất may mắn, Flutter 3.20 đã có một cải tiến rất lớn cho việc này! Đó chính là API `TwoDimensionalScrollView` và cảm ơn Flutter team đã có một video giới thiệu cách sử dụng không thể nào dễ hiểu hơn, bạn có thể xem nó tại [đây](https://www.youtube.com/watch?v=ppEdTo-VGcg).

Tôi bắt đầu tạo ra package [boundless_stack](https://github.com/definev/boundless_stack) và open-source nó tại đây. bạn có thể tìm hiểu cách sử dụng nó sâu hơn trong repository này. Sau khi tạo ra package này tôi đã thử chạy với 10000 widget con bên trong và hoàn toàn có thể zoom, pan, và scroll hoàn toàn mượt mà!

![alt text](images/sample_boundless_stack.png)

