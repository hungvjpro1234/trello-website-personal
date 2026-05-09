# Trello Web Clone

Một bản dựng giao diện Trello theo hướng hiện đại với `React`, `Vite`, `Material UI` và `dnd-kit`.
Project này tập trung vào trải nghiệm board: kéo thả cột, kéo thả card, đổi theme, dựng layout sát cảm giác của Trello và chuẩn bị sẵn nền để nối API thật về sau.

## Điểm nổi bật

- Giao diện board kiểu Trello với `App Bar`, `Board Bar`, danh sách cột và thẻ.
- Kéo thả cột theo chiều ngang bằng `dnd-kit`.
- Kéo thả card trong cùng cột hoặc giữa nhiều cột.
- Có xử lý riêng cho cột rỗng bằng placeholder card để tránh lỗi drag and drop.
- Hỗ trợ `light`, `dark` và `system mode` thông qua `MUI CssVarsProvider`.
- Dùng mock data để mô phỏng dữ liệu board ngay khi chạy local.
- Cấu trúc source tách theo page, component và utility, khá thuận tiện để mở rộng tiếp.

## Demo hiện tại

Ứng dụng hiện đang mount trực tiếp trang chi tiết board trong [`src/App.jsx`](/d:/trello-web/trello-web/src/App.jsx:1), tức là khi chạy lên bạn sẽ vào thẳng màn hình board thay vì đi qua router.

Board demo gồm:

- Nhiều cột với thứ tự được điều khiển bởi `columnOrderIds`.
- Nhiều card có cover, comments, attachments và member mock.
- Một cột rỗng để kiểm thử luồng kéo card vào hoặc ra khỏi cột trống.

## Tech Stack

- `React 18`
- `Vite 4`
- `Material UI 5`
- `Emotion`
- `dnd-kit`
- `Lodash`
- `ESLint`

## Cấu trúc thư mục

```text
src/
  apis/                 Mock data cho board
  assets/               SVG và asset tĩnh
  components/           App bar, menu, mode switch...
  pages/
    Boards/             Màn hình board và toàn bộ drag-and-drop flow
    Auth/               Placeholder cho trang xác thực
    Users/              Placeholder cho trang người dùng
  redux/                Placeholder cho store
  utils/                Hàm sắp xếp, formatter, hằng số
  App.jsx               Mount màn hình board
  main.jsx              Entry point + theme provider
  theme.js              Custom theme và CSS variables cho MUI
```

## Luồng drag and drop

Phần đáng chú ý nhất của project nằm ở [`src/pages/Boards/BoardContent/BoardContent.jsx`](/d:/trello-web/trello-web/src/pages/Boards/BoardContent/BoardContent.jsx:1):

- Phân biệt rõ drag `COLUMN` và drag `CARD`.
- Dùng `MouseSensor` và `TouchSensor` để cải thiện trải nghiệm trên desktop và mobile.
- Tự viết `collisionDetectionStrategy` để xử lý chính xác khi rê card qua card hoặc qua cột.
- Dùng `DragOverlay` để phần tử đang kéo hiển thị mượt và trực quan hơn.
- Dùng placeholder card cho cột rỗng để không làm vỡ logic của `dnd-kit`.

Nếu bạn đang học cách triển khai board kiểu Kanban với React, đây là phần đáng đọc đầu tiên.

## Cài đặt và chạy local

Yêu cầu:

- `Node.js >= 18`
- `npm` hoặc `yarn`

Cài dependencies:

```bash
npm install
```

Hoặc:

```bash
yarn
```

Chạy môi trường dev:

```bash
npm run dev
```

Build production:

```bash
npm run build
```

Preview bản build:

```bash
npm run preview
```

Lint source:

```bash
npm run lint
```

## Scripts

| Script | Mô tả |
| --- | --- |
| `npm run dev` | Chạy Vite dev server với `--host` |
| `npm run build` | Build production với base path tương đối |
| `npm run preview` | Preview bản build local |
| `npm run lint` | Kiểm tra lint trong thư mục `src` |

## Dữ liệu và cấu hình hiện tại

- Dữ liệu board đang lấy từ [`src/apis/mock-data.js`](/d:/trello-web/trello-web/src/apis/mock-data.js:1).
- Theme dùng `Experimental_CssVarsProvider` trong [`src/main.jsx`](/d:/trello-web/trello-web/src/main.jsx:1).
- Alias `~` được map tới `/src` trong [`vite.config.js`](/d:/trello-web/trello-web/vite.config.js:1).
- `API_ROOT` đã được khai báo trong [`src/utils/constants.js`](/d:/trello-web/trello-web/src/utils/constants.js:1), nhưng hiện tại app vẫn đang chạy bằng mock data, chưa gọi API thật.

## Trạng thái dự án

Repo này đang ở giai đoạn frontend foundation:

- Đã có layout và trải nghiệm board khá hoàn chỉnh.
- Đã có logic reorder cột và thẻ ngay trên UI.
- Chưa nối router thực tế.
- Chưa nối backend thật cho board/cards.
- Các trang `Auth`, `Users`, `Boards list`, `Redux store` mới là placeholder.

Nói ngắn gọn: phần "kéo thả và cảm giác dùng board" đã có hồn, còn phần "hệ thống hoàn chỉnh" vẫn đang chờ ghép tiếp.

## Gợi ý mở rộng tiếp theo

- Tích hợp `react-router-dom` cho các route như `/boards`, `/boards/:id`, `/login`.
- Thay mock data bằng API thật.
- Lưu thứ tự column/card xuống backend sau khi drag end.
- Thêm tạo/sửa/xóa column và card.
- Thêm xác thực người dùng và phân quyền board.
- Bổ sung Redux hoặc state management khi app bắt đầu có dữ liệu thật và nhiều luồng cập nhật hơn.

## Ghi chú

- Repo có cả `package-lock.json` và `yarn.lock`, nên nên thống nhất một package manager trong team để tránh lockfile lệch nhau.
- Một số file trong source đang có nhiều comment học tập, phù hợp để đọc và lần theo logic nếu bạn đang dùng repo này như tài liệu học.

## Tác giả gốc

Source này bắt đầu từ base project học tập của `TrungQuanDev`, sau đó được tổ chức lại README để tập trung vào tài liệu kỹ thuật của chính repo.
