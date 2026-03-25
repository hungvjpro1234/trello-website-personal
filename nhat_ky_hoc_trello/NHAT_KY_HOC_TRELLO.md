# Nhật Ký Học Tập Dự Án Trello Web

## Context làm việc cố định

Tôi đang học MERN thông qua dự án full-stack xây dựng Trello Web kéo thả. Tôi muốn duy trì một cuốn nhật ký học tập chi tiết để ghi lại những gì mình học được qua từng buổi, không chỉ về mặt code mà còn về cách làm việc, cách tổ chức commit, cách đọc docs, cách tư duy khi chia nhỏ vấn đề và cách triển khai tính năng.

Nhiệm vụ mặc định khi cập nhật file này:
- Đối chiếu lịch sử `git commit`.
- Đọc comment trong code.
- Ghi lại những gì đã học được theo từng buổi hoặc từng giai đoạn.
- Trích lại những đoạn code quan trọng để lưu dấu mốc học tập.
- Ghi lại flow xử lý được đánh dấu trong comment.
- Giải thích cách code đã được áp dụng trực tiếp vào dự án.
- Rút ra bài học về kỹ thuật và cách làm việc.
- Chỉ ra bước tiếp theo nên học hoặc nên làm.

Khi tiếp tục cập nhật nhật ký này ở các lần sau, hãy ưu tiên:
- Đọc file này trước để hiểu văn phong và cấu trúc đang dùng.
- Đọc thêm các commit mới.
- Đọc các comment mới trong code.
- Viết tiếp theo đúng mạch, không phá vỡ cấu trúc sẵn có.
- Ưu tiên tiếng Việt tự nhiên, rõ ràng, có tính học tập và tổng kết.
- Khi cần, chèn các block code ngắn để đánh dấu phần quan trọng.
- Khi có comment chỉ dẫn flow, cần diễn giải lại thành luồng hiểu được bằng lời.
- Nêu rõ “đã dùng ở đâu trong dự án”, không chỉ dừng ở mức khái niệm.

Lưu ý:
- File này đóng vai trò như “bối cảnh làm việc lâu dài” ngay trong repo.
- Mỗi mục nhật ký nên trả lời được các câu hỏi: “Mình đã làm gì?”, “Mình học được gì?”, “Vì sao code như vậy?”, “Cách làm việc rút ra là gì?”, “Tiếp theo nên làm gì?”.
- Nếu trong code có comment quan trọng, cần ưu tiên biến comment đó thành kiến thức có cấu trúc trong nhật ký.
- Nếu có đoạn code nhỏ nhưng mang tính nền tảng, nên lưu lại ngay trong nhật ký để tiện ôn tập sau này.

## Context tự ép phân tích đúng hướng

Đây là những điểm dễ bị làm chưa đủ sâu nếu không tự nhắc trước. Khi cập nhật nhật ký này, phải chủ động ép mình làm đúng các yêu cầu dưới đây:

### 1. Luôn nối thành flow end-to-end

Không chỉ dừng ở mức hiểu từng đoạn code riêng lẻ. Phải cố gắng nối chúng thành luồng đầy đủ từ đầu đến cuối.

Ví dụ về kiểu flow cần ưu tiên tìm:
- UI interaction -> event handler -> local state -> props hoặc context -> API call -> server handler -> DB -> response -> cập nhật lại UI.
- Với front-end hiện tại: `main.jsx` -> provider toàn cục -> `App.jsx` -> component con -> hook -> state -> render result.
- Với drag-and-drop về sau: drag event -> cập nhật state tạm thời -> đồng bộ UI -> gọi API lưu thay đổi -> phản hồi từ server -> cập nhật state chính thức.

Nguyên tắc bắt buộc:
- Nếu mới mô tả được một đoạn code mà chưa nối được các bước trước và sau nó, thì phần nhật ký đó vẫn chưa đủ.
- Nếu thấy flow còn hở 1 hoặc 2 bước, phải ghi rõ “đang thiếu mắt xích nào” thay vì bỏ qua.

### 2. Luôn rút ra bài học kỹ thuật thật sự

Không chỉ viết kiểu mô tả bề mặt như:
- “Đoạn code này dùng để cập nhật state.”
- “Đoạn code này dùng để đổi theme.”

Phải cố gắng đi thêm một tầng và trả lời:
- Pattern này giúp ích gì?
- Nó tránh được vấn đề gì?
- Nó làm code dễ mở rộng hơn ở điểm nào?
- Nó giúp giảm re-render, tránh race condition, tránh sync issue, hay tách trách nhiệm như thế nào?

Ví dụ mong muốn:
- Không chỉ viết “provider dùng để bọc app”.
- Mà nên viết “đặt provider ở `main.jsx` giúp toàn bộ cây component dùng chung cấu hình, tránh truyền props sâu và tạo một điểm quản lý tập trung”.

Nguyên tắc bắt buộc:
- Mỗi buổi nên có ít nhất một bài học rút ra ở mức pattern, kiến trúc hoặc cách tư duy, không chỉ ở mức chức năng.

### 3. Luôn đặt thay đổi vào context toàn dự án

Không chỉ nhìn commit lẻ hoặc file lẻ. Phải tự hỏi:
- Thay đổi này nằm ở tầng nào của hệ thống?
- Nó phục vụ tính năng nào của Trello Web?
- Nó ảnh hưởng file nào khác bây giờ hoặc về sau?
- Nó là bước chuẩn bị cho phần nào tiếp theo của dự án?

Ví dụ:
- Một thay đổi ở `theme.js` không chỉ là đổi màu, mà là chuẩn bị nền tảng giao diện chung cho board, column, card và các component sẽ xuất hiện sau này.
- Một thay đổi ở `main.jsx` thường là thay đổi ở cấp ứng dụng, có tác động rộng hơn thay đổi trong một component riêng lẻ.

Nguyên tắc bắt buộc:
- Khi ghi nhật ký cho một commit hoặc một cụm commit, phải nêu được vai trò của nó trong bức tranh lớn của dự án.
- Nếu chưa đủ context toàn repo, cần ghi rõ đây là nhận định tạm thời dựa trên phần code hiện có.

## Cách dùng nhật ký

- Mỗi buổi học nên có ngày, mục tiêu, phần đã làm, điều rút ra và việc cần làm tiếp.
- Ưu tiên viết bằng ngôn ngữ của chính mình, ngắn gọn nhưng rõ ý.
- Khi học từ commit, nên đối chiếu 3 thứ: tên commit, file bị sửa, comment trong code.
- Khi học từ video hoặc course, có thể thêm mục “đối chiếu với bài giảng” để biết mình đã theo đến đâu.
- Nếu có flow rõ ràng trong code, nên thêm mục “Luồng chạy” hoặc “Cách hoạt động”.
- Nếu có đoạn code đáng nhớ, nên thêm mục “Code quan trọng”.
- Nếu đã áp dụng kiến thức vào dự án, nên thêm mục “Đã áp dụng trong dự án như thế nào?”.

## Nhật ký khởi động dự án

### Buổi 1 - 2026-03-18 - Khởi tạo bộ khung front-end

Nguồn đối chiếu:
- Commit `20e01f7` - `init`
- File chính: `package.json`, `vite.config.js`, `src/main.jsx`, `src/App.jsx`, `README.md`

Mình đã học được:
- Dự án bắt đầu từ bộ khung Vite + React, nghĩa là ưu tiên tốc độ khởi tạo nhanh, hot reload tốt và cấu hình gọn.
- `src/main.jsx` là điểm vào của ứng dụng. Đây là nơi React gắn app vào DOM thông qua `ReactDOM.createRoot(...)`.
- `src/App.jsx` ở giai đoạn đầu chỉ đóng vai trò component gốc để test giao diện và xác nhận app chạy được.
- `README.md` không chỉ là mô tả repo mà còn là tài liệu kỹ thuật: phiên bản `node`, `npm`, `yarn`, `react`, `vite` đều được ghi rõ. Đây là một bài học quan trọng về việc giữ môi trường học tập ổn định.

Cách code và cách làm việc rút ra:
- Nên bắt đầu bằng một commit nhỏ, rõ ràng, chạy được. `init` là cột mốc để sau này so sánh mọi thay đổi tiếp theo.
- README tốt giúp mình học dễ hơn, nhất là khi học theo course kéo dài.
- Khi vào một dự án mới, việc đầu tiên nên đọc là `package.json`, `src/main.jsx` và `README.md` để biết entry point, stack và ràng buộc phiên bản.

Điều mình cần nhớ:
- Không nên lao vào code ngay khi chưa xác định được entry point và dependency chính.
- Versioning là một phần của quy trình làm việc, không phải chỉ là chi tiết phụ.

Việc tiếp theo lúc đó:
- Đưa MUI vào dự án để chuẩn hóa giao diện cơ bản.

Code quan trọng:

```jsx
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

Vì sao đoạn này quan trọng:
- Đây là điểm bắt đầu thật sự của ứng dụng React.
- `ReactDOM.createRoot(...)` là nơi app được mount vào DOM.
- `React.StrictMode` giúp phát hiện sớm một số vấn đề trong quá trình phát triển.

Đã áp dụng trong dự án như thế nào?
- Toàn bộ giao diện Trello về sau đều phải đi qua điểm vào này.
- Những provider toàn cục như theme, state hoặc router sau này đều sẽ được bọc từ đây.

### Buổi 2 - 2026-03-19 - Đưa MUI vào app và reset giao diện bằng CssBaseline

Nguồn đối chiếu:
- Commit `a5ab2c1` - `add CSS baseline`
- Merge commit `6e795e0` - merge nhánh `add_css_baseline`
- File chính: `src/main.jsx`, `package.json`

Mình đã học được:
- `CssBaseline` của MUI được đưa vào ngay từ `src/main.jsx`, tức là áp dụng reset CSS ở cấp ứng dụng thay vì từng component.
- Hai file `src/App.css` và `src/index.css` bị loại bỏ, cho thấy dự án đang chuyển từ style mặc định của Vite sang hệ thống UI do MUI quản lý.
- Cách này giúp giao diện có nền tảng nhất quán hơn, giảm việc “fix CSS vặt” từ browser style mặc định.

Cách code và cách làm việc rút ra:
- Đặt các cấu hình global ở entry point là hợp lý, vì nó ảnh hưởng đến toàn bộ app.
- Commit này rất tập trung: chỉ giải quyết một ý tưởng là “thêm baseline”. Đây là cách tách việc tốt khi học và khi làm việc nhóm.
- Tên branch `add_css_baseline` và merge qua PR cho thấy một workflow dễ hiểu: mỗi chủ đề học hoặc thay đổi lớn đều có thể tách nhánh riêng.

Điều mình cần nhớ:
- `CssBaseline` không làm giao diện đẹp hơn ngay lập tức, nhưng nó tạo mặt bằng ổn định để xây tiếp.
- Nhiều thay đổi “nhỏ” ở tầng nền lại ảnh hưởng lớn đến khả năng mở rộng sau này.

Việc tiếp theo lúc đó:
- Tạo theme riêng thay vì dùng mặc định của MUI.

Code quan trọng:

```jsx
<React.StrictMode>
  <CssBaseline />
  <App />
</React.StrictMode>
```

Luồng chạy:
- App được render từ `main.jsx`.
- `CssBaseline` chạy ở cấp toàn cục.
- Mọi component bên trong `App` đều hưởng lợi từ bộ reset style này.

Đã áp dụng trong dự án như thế nào?
- Dự án bỏ dần CSS mặc định từ Vite và chuyển sang nền giao diện nhất quán hơn với MUI.
- Đây là bước chuẩn bị để sau đó theme và dark/light mode hoạt động ổn định hơn.

### Buổi 3 - 2026-03-19 - Tạo theme trung tâm cho MUI

Nguồn đối chiếu:
- Commit `1c7600f` - `add and test theme in MUI`
- Merge commit `a30ee60` - merge nhánh `config-mui-theme`
- File chính: `src/theme.js`, `src/main.jsx`

Mình đã học được:
- Theme được tách ra thành file riêng `src/theme.js`, cho thấy tư duy tách cấu hình UI khỏi entry point.
- `createTheme` được dùng để định nghĩa `palette` gồm `primary`, `secondary`, `error`. Nghĩa là màu sắc của hệ thống được đưa về một nơi quản lý.
- Trong buổi này, theme đã bắt đầu có `cssVariables: true`, đây là dấu hiệu sớm cho hướng đi dynamic theming.
- `src/main.jsx` đã chuyển sang bọc `App` trong provider của MUI thay vì render trực tiếp.

Cách code và cách làm việc rút ra:
- Các giá trị mang tính “design system” nên đưa vào một file cấu hình, không hard-code rải rác trong component.
- Theme là một lớp trừu tượng giúp về sau đổi màu, đổi mode, đổi token nhanh hơn.
- Workflow học rất hợp lý: baseline trước, theme sau. Tức là dựng tầng nền xong mới tới tầng tùy biến.

Điều mình cần nhớ:
- Theme không chỉ để đổi màu nút bấm; nó là cách thống nhất ngôn ngữ giao diện của cả app.
- Tách file sớm sẽ giúp sau này bổ sung typography, spacing, shadows, component overrides dễ hơn.

Việc tiếp theo lúc đó:
- Nâng cấp theme để hỗ trợ light mode và dark mode thật sự.

Code quan trọng:

```jsx
const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
})
```

Luồng hoạt động:
- Tạo một object theme tập trung.
- Định nghĩa các màu cốt lõi như `primary`, `secondary`, `error`.
- Đưa theme đó vào provider ở `main.jsx` để cả app dùng chung.

Đã áp dụng trong dự án như thế nào?
- Từ đây màu sắc không còn nằm rải rác trong từng component.
- Đây là nền móng để chuyển tiếp sang `colorSchemes` ở bước dark/light mode.

### Buổi 4 - 2026-03-19 - Chuyển sang CSS Variables và thêm dark/light mode

Nguồn đối chiếu:
- Commit `5852026` - `Complete dark mode and light mode setting`
- Merge commit `222fd35` - merge nhánh `dark_light`
- File chính: `src/App.jsx`, `src/main.jsx`, `src/theme.js`
- Comment trong code ở `src/App.jsx`, `src/main.jsx`, `src/theme.js`

Mình đã học được:
- Dự án chuyển từ `ThemeProvider` và `createTheme` sang `Experimental_CssVarsProvider` và `experimental_extendTheme`.
- `theme.js` được nâng cấp thành `colorSchemes` với 2 nhánh `light` và `dark`, mỗi nhánh có `palette` riêng.
- `useColorScheme()` là hook trung tâm để đọc `mode` hiện tại và đổi qua `setMode(...)`.
- Trong `App.jsx`, việc đổi mode được thử nghiệm bằng 2 cách:
- Nút toggle nhanh `ModeToggle`.
- Select có icon `ModeSelect`.
- Comment trong code ghi rõ “dùng hook useColorScheme”, “hàm chuyển đổi”, “lấy từ docs của MUI”, cho thấy mình đang học theo kiểu vừa đọc docs vừa viết lại bằng ngôn ngữ của chính mình. Đây là cách học rất tốt.

Cách code và cách làm việc rút ra:
- Khi học một tính năng mới, làm một phiên bản đơn giản trước như `ModeToggle`, rồi mới nâng lên UI thân thiện hơn như `ModeSelect`, là cách tiếp cận đúng.
- Việc gắn link docs ngay trong comment giúp sau này quay lại tra cứu nhanh, nhất là với các API còn mang tính experimental.
- Tên nhánh `dark_light`, `config-mui-theme`, `add_css_baseline` cho thấy cách chia công việc theo chủ đề kỹ thuật. Đây là thói quen nên giữ.
- Merge commit trên GitHub cho thấy quy trình làm việc có branch và PR, không sửa trực tiếp tất cả trên `master`. Đây là một bài học về kỷ luật làm việc, không chỉ về code.

Điều mình cần nhớ:
- API `Experimental_CssVarsProvider` và `experimental_extendTheme` cho thấy mình đang đi theo hướng hiện đại của MUI, nhưng cũng cần để ý khi nâng cấp version.
- Theme mode là state ở mức ứng dụng, vì vậy provider phải nằm ở `src/main.jsx` để toàn bộ component dùng chung.
- Comment nên tập trung vào “vì sao” và “đang học API nào”, đúng như cách mình đang làm hiện tại.

Việc tiếp theo lúc đó:
- Bắt đầu đưa layout Trello thật sự vào, thay vì mới dừng ở button và test component.
- Ghi tiếp nhật ký mỗi khi có commit về board, column, card, drag-and-drop, API và state management.

Code quan trọng:

```jsx
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from './theme.js'

<CssVarsProvider theme={theme}>
  <CssBaseline />
  <App />
</CssVarsProvider>
```

```jsx
const { mode, setMode } = useColorScheme()

const handleChange = (event) => {
  const selectedMode = event.target.value
  setMode(selectedMode)
}
```

```jsx
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: teal[500]
        },
        secondary: {
          main: deepOrange[500]
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: cyan[500]
        },
        secondary: {
          main: orange[500]
        }
      }
    }
  }
})
```

Luồng chạy được đánh dấu trong comment:
- `src/main.jsx` bọc toàn bộ ứng dụng bằng `CssVarsProvider` để cung cấp theme cho mọi component.
- `src/theme.js` định nghĩa 2 nhánh màu `light` và `dark`.
- `src/App.jsx` dùng `useColorScheme()` để đọc mode hiện tại và gọi `setMode(...)` khi người dùng đổi lựa chọn.
- `ModeSelect` đóng vai trò giao diện điều khiển.
- `ModeToggle` là phiên bản thử nghiệm đơn giản để kiểm tra logic chuyển mode trước khi hoàn thiện UI hơn.

Cách dùng đã được áp dụng vào dự án:
- Dự án đã áp dụng cơ chế đổi giao diện sáng tối ngay ở tầng cấu hình gốc, thay vì xử lý thủ công ở từng component.
- Điều này giúp mọi phần UI trong tương lai như board, column, card đều có thể thừa hưởng theme hiện tại mà không cần viết lại logic đổi màu ở nhiều nơi.
- Đây là ví dụ rõ nhất cho việc tách “logic cấu hình toàn cục” khỏi “giao diện cụ thể”.

## Tổng kết giai đoạn đầu

Qua 4 commit đầu, mình thấy lộ trình học đang đi rất đúng thứ tự:

1. Khởi tạo app chạy được.
2. Đặt nền UI bằng MUI và `CssBaseline`.
3. Tạo theme trung tâm.
4. Nâng cấp sang cơ chế hỗ trợ nhiều color scheme và switch mode.

Điều quan trọng hơn cả code là cách làm việc mình học được từ lịch sử commit:
- Mỗi commit nên giải quyết một ý rõ ràng.
- Nên tạo branch theo chủ đề.
- Nên merge qua PR để nhìn được quá trình tiến hóa của dự án.
- Nên viết comment để đánh dấu phần đang học từ docs, đang thử nghiệm hoặc cần ghi nhớ.

## Quy ước mở rộng cho các lần cập nhật sau

Từ bây giờ, khi cập nhật file này, ngoài phần tổng kết học tập thông thường, cần bổ sung thêm các nội dung sau nếu có:

- `Code quan trọng`:
  - Trích các đoạn code ngắn nhưng mang tính nền tảng hoặc đánh dấu mốc học tập.
- `Luồng chạy` hoặc `Luồng hoạt động`:
  - Diễn giải lại flow đang được comment trong code theo cách dễ hiểu.
- `Cách dùng đã được áp dụng trong dự án`:
  - Ghi rõ kiến thức đó đang được dùng ở file nào, cấp nào, mục đích gì.
- `Comment đáng chú ý`:
  - Nếu trong code có comment thể hiện rõ ý đồ học tập, docs tham chiếu hoặc lý do chọn giải pháp, cần đưa vào nhật ký dưới dạng kiến thức đã chắt lọc.

Context bổ sung cần luôn được hiểu là đang có hiệu lực:
- Tôi không chỉ muốn ghi chú lý thuyết, mà muốn lưu cả ví dụ code thật từ chính dự án.
- Tôi muốn nhìn được từ commit sang code, từ code sang flow, từ flow sang cách áp dụng thực tế.
- Tôi muốn file này đủ rõ để về sau chỉ cần mở ra là có thể ôn lại cả kỹ thuật lẫn cách làm việc.

## Mẫu ghi cho các buổi sau

Có thể copy block này cho mỗi buổi mới:

```md
### Buổi X - YYYY-MM-DD - Tên chủ đề

Nguồn đối chiếu:
- Commit:
- File chính:
- Video, docs, comment liên quan:

Mình đã học được:
- 

Cách code và cách làm việc rút ra:
- 

Điều mình cần nhớ:
- 

Việc tiếp theo:
- 
```

## Nhật ký giai đoạn dựng layout Trello

### Buổi 5 - 2026-03-22 - Dựng khung layout đầu tiên cho trang Board

Nguồn đối chiếu:
- Commit `946fea1` - `Init layout`
- Merge commit `4656e59` - merge nhánh `init_layout`
- File chính: `src/App.jsx`, `src/theme.js`
- Hình đối chiếu layout: `img_layout/example_layouyt.png`
- Comment liên quan trong code ở `src/App.jsx`, `src/theme.js`

Mình đã học được:
- Sau khi có theme sáng/tối, bước hợp lý tiếp theo là dựng skeleton giao diện thật thay vì chỉ test bằng các button rời rạc.
- `App.jsx` ở commit này không còn là nơi test component đơn lẻ nữa, mà bắt đầu đóng vai trò mô phỏng trang board với 3 vùng: header, board bar và board content.
- `theme.js` được mở rộng thêm namespace `trello` để chứa các thông số layout như `appBarHeight` và `boardBarHeight`. Đây là bước chuyển từ việc chỉ quản lý màu sang quản lý cả token giao diện.
- `Board Content` được tính chiều cao bằng công thức trừ đi tổng chiều cao của `App Bar` và `Board Bar`, cho thấy cách nghĩ theo layout tổng thể thay vì style từng khối riêng lẻ.

Cách code và cách làm việc rút ra:
- Khi bắt đầu dựng UI lớn, nên chốt trước bộ khung chiều cao, khu vực và quan hệ giữa các khối. Nếu chưa có skeleton ổn định thì về sau rất dễ chỉnh tay từng nơi và lệch layout.
- Việc đưa các con số như `48px`, `56px` vào `theme.trello` là một pattern tốt: token hóa layout để sau này đổi một chỗ, toàn bộ vùng liên quan cập nhật theo.
- Commit này còn cho thấy cách học rất thực tế: lấy tính năng đã có sẵn từ theme mode rồi áp trực tiếp vào layout mới, thay vì học từng mảnh tách rời.

Điều mình cần nhớ:
- `theme` không chỉ chứa màu. Khi dự án bắt đầu có cấu trúc giao diện rõ, `theme` còn là nơi chứa kích thước nền tảng.
- Công thức `calc(100% - appBarHeight - boardBarHeight)` là kiến thức rất hay vì nó giúp chia layout theo chiều dọc một cách chủ động, tránh để nội dung bị tràn hoặc phải đo thủ công ở nhiều nơi.
- Đây mới là khung đầu tiên nên còn đặt trực tiếp tất cả trong `App.jsx`. Điều này ổn ở bước dựng nhanh, nhưng về sau cần tách nhỏ để dễ quản lý.

Việc tiếp theo lúc đó:
- Tách layout thành các component và page riêng để giảm độ phình của `App.jsx`.

Code quan trọng:

```jsx
trello: {
  appBarHeight: '48px',
  boardBarHeight: '56px'
}
```

```jsx
<Box
  sx={{
    height: (theme) =>
      `calc(100% - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`
  }}
>
  Board Content
</Box>
```

Luồng hoạt động:
- `App.jsx` render một `Container` full height để chiếm toàn bộ viewport.
- Bên trong `Container`, app chia lần lượt thành `Header`, `Board Bar`, rồi `Board Content`.
- `Header` và `Board Bar` lấy chiều cao từ `theme.trello`.
- `Board Content` không hard-code chiều cao mà tự tính phần còn lại dựa trên 2 token phía trên.
- Nhờ đó, khi đổi chiều cao ở `theme.js`, toàn bộ layout dọc đổi theo cùng một nguồn.

Cách dùng đã được áp dụng trong dự án:
- Kiến thức về token layout đã được dùng trực tiếp trong `src/theme.js` để điều khiển toàn bộ khung trang board.
- `src/App.jsx` ở giai đoạn này đóng vai trò nơi ráp khung tổng quát đầu tiên cho giao diện Trello Web.
- Đây là bước chuẩn bị rất quan trọng cho việc tách `AppBar`, `BoardBar`, `BoardContent` thành các file riêng ở commit sau.

Comment đáng chú ý:
- Comment “Dùng bản sử dụng tạo ra bộ cơ sở trên theme.js” xuất hiện ở các khối layout cho thấy tư duy đang chuyển từ hard-code style sang dùng theme làm nguồn cấu hình chung.

### Buổi 6 - 2026-03-22 - Refactor cấu trúc dự án theo page và component

Nguồn đối chiếu:
- Commit `793f782` - `Refactor Project Stucture`
- Merge commit `4462874` - merge nhánh `refactor_project_structure`
- Commit `2f16298` - `fix pj structure auth`
- File chính: `src/App.jsx`, `src/pages/Boards/_id.jsx`, `src/components/AppBar/index.jsx`, `src/components/ModeSelect/index.jsx`, `src/pages/Boards/BoardBar/index.jsx`, `src/pages/Boards/BoardContent/index.jsx`, `src/pages/Auth/index.jsx`
- Comment liên quan trong code ở `src/pages/Boards/_id.jsx`, `src/pages/Boards/BoardBar/index.jsx`, `src/pages/Boards/BoardContent/index.jsx`

Mình đã học được:
- `App.jsx` được làm gọn lại rất mạnh: thay vì chứa toàn bộ layout và logic chọn mode, nó chỉ còn import `Board` và render ra trang board.
- Dự án bắt đầu có cấu trúc rõ hơn theo hướng `pages` và `components`. Những gì mang tính trang như board được đặt trong `src/pages/Boards`, còn phần dùng lại được như `AppBar`, `ModeSelect` được đặt trong `src/components`.
- `BoardBar` và `BoardContent` được đặt bên trong thư mục `pages/Boards`, nghĩa là đây là component gắn chặt với ngữ cảnh trang board chứ chưa phải reusable component toàn app.
- Commit `fix pj structure auth` tuy nhỏ nhưng có ý nghĩa: khi đã định hình structure thì cần tạo đủ các “điểm đặt chỗ” cho những miền chức năng chính như `Auth`, `Users`, `Boards`.

Cách code và cách làm việc rút ra:
- Refactor tốt là khi trách nhiệm của file rõ hơn sau khi tách. Ở đây `App.jsx` trở lại đúng vai trò cấp cao, còn phần layout cụ thể được đẩy xuống page-level.
- Việc tách `ModeSelect` ra riêng là một bài học hay về cô lập logic tương tác khỏi layout chứa nó. Header chỉ cần dùng component đó thay vì hiểu chi tiết `useColorScheme`.
- Tạo sẵn `pages/Auth`, `pages/Users`, `redux`, `utils` dù chưa dùng hết cũng là cách dựng bộ khung kiến trúc trước, để khi thêm tính năng không bị vá cấu trúc theo từng lần.

Điều mình cần nhớ:
- Không phải component nào cũng cần đưa vào `src/components`. Nếu nó gần như chỉ phục vụ một page, đặt cạnh page đó thường dễ đọc hơn.
- Refactor structure không tạo ra tính năng mới ngay, nhưng nó làm giảm ma sát rất lớn cho các commit tiếp theo.
- Những commit “rất nhỏ” như thêm `src/pages/Auth/index.jsx` đôi khi là dấu hiệu quan trọng cho thấy cấu trúc dự án đã được nghĩ theo bức tranh lớn hơn.

Việc tiếp theo lúc đó:
- Chuẩn hóa cách import để khi cấu trúc thư mục sâu dần thì đường dẫn vẫn dễ đọc.

Code quan trọng:

```jsx
import Board from './pages/Boards/_id'

function App() {
  return (
    <>
      {/* React Router Dom /boards /boards/{board_id} */}
      {/* Board Details */}
      <Board />
    </>
  )
}
```

```jsx
function Board() {
  return (
    <Container maxWidth={false} disableGutters sx={{ height: '100vh' }}>
      <Appbar />
      <BoardBar />
      <BoardContent />
    </Container>
  )
}
```

Luồng chạy:
- `main.jsx` vẫn là entry point toàn app và bọc app bằng provider theme như ở giai đoạn trước.
- `App.jsx` trở thành lớp điều hướng cấp cao, hiện tại đang render `Board`.
- `src/pages/Boards/_id.jsx` là nơi ráp các phần con của trang board.
- `AppBar`, `BoardBar`, `BoardContent` mỗi file phụ trách một vùng giao diện riêng.
- `ModeSelect` được `AppBar` dùng lại như một component con thay vì nằm trực tiếp trong `App.jsx`.

Cách dùng đã được áp dụng trong dự án:
- `src/pages/Boards/_id.jsx` đã trở thành nơi mô tả cấu trúc end-to-end của trang board.
- `src/components/ModeSelect/index.jsx` giữ lại logic đổi mode và được tái sử dụng trong header.
- `src/pages/Auth/index.jsx`, `src/pages/Users/index.jsx`, `src/pages/Users/_id.jsx` là các mốc chuẩn bị cho router và domain tách biệt về sau.

Comment đáng chú ý:
- Comment ở `BoardBar` nói rõ đây là component “hầu như chỉ sử dụng ở trang Board nên tách ra thành component bên trong page”. Đây là một ghi chú kiến trúc rất đáng giữ vì nó giải thích lý do đặt file, không chỉ mô tả chức năng.

### Buổi 7 - 2026-03-22 - Chuẩn hóa absolute import và alias `~`

Nguồn đối chiếu:
- Commit `6d1bf67` - `realative-absolute-import`
- Merge commit `75604b5` - merge nhánh `relative-absolute-import`
- File chính: `jsconfig.json`, `vite.config.js`, `src/main.jsx`, `src/App.jsx`, `src/pages/Boards/_id.jsx`, `src/components/AppBar/index.jsx`
- Comment liên quan trong code ở `jsconfig.json`, `vite.config.js`, `src/pages/Boards/_id.jsx`

Mình đã học được:
- Dự án thêm `jsconfig.json` để IDE hiểu alias `~/* -> ./src/*`. Nghĩa là không chỉ bundler chạy được, mà cả trải nghiệm điều hướng code khi học cũng được cải thiện.
- `vite.config.js` thêm `resolve.alias` để runtime build hiểu `~` là `'/src'`.
- Code bắt đầu thống nhất quy ước import: file ở ngoài thư mục thì dùng absolute path với `~`, file cùng thư mục thì giữ relative path cho gọn.
- Đây là thay đổi nhỏ về cú pháp nhưng ảnh hưởng lớn đến khả năng đọc code khi dự án ngày càng sâu thư mục.

Cách code và cách làm việc rút ra:
- Khi dự án mới chỉ vài file, đường dẫn `../../..` chưa gây đau đầu. Nhưng nên chuẩn hóa sớm trước khi số lượng component và page tăng lên.
- Một bài học rất hay ở commit này là phải đồng bộ 2 tầng cùng lúc:
- IDE level: `jsconfig.json`.
- Build tool level: `vite.config.js`.
- Nếu chỉ làm một vế thì hoặc editor hiểu mà app không chạy, hoặc app chạy mà editor không hỗ trợ điều hướng.

Điều mình cần nhớ:
- Absolute import giúp file dễ di chuyển hơn vì ít phụ thuộc vào độ sâu thư mục hiện tại.
- Relative import vẫn có chỗ đứng, nhất là khi import file cùng thư mục hoặc cùng module để code ngắn và biểu đạt “quan hệ gần”.
- Quy ước import là một phần của kiến trúc dự án, không chỉ là chuyện viết cho đẹp.

Việc tiếp theo lúc đó:
- Tiếp tục dùng cấu trúc mới để dựng phần header chi tiết hơn và bắt đầu đưa asset SVG vào giao diện.

Code quan trọng:

```json
{
  "compilerOptions": {
    "paths": {
      "~/*": ["./src/*"]
    }
  }
}
```

```js
resolve: {
  alias: [
    { find: '~', replacement: '/src' }
  ]
}
```

```jsx
// Các file ngoài thư mục nên sử dụng absolute path
import Appbar from '~/components/AppBar'

// Các file trong cùng thư mục nên sử dụng relative path cho gọn cú pháp
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'
```

Luồng hoạt động:
- Editor đọc `jsconfig.json` để hiểu alias `~`.
- Vite đọc `vite.config.js` để resolve alias khi bundle.
- Từ đó các file như `src/main.jsx`, `src/App.jsx`, `src/components/AppBar/index.jsx` có thể import từ `~/...`.
- Trong từng module, các file cùng cấp vẫn dùng `./...` để biểu đạt đây là dependency nội bộ gần nhất.

Cách dùng đã được áp dụng trong dự án:
- `src/main.jsx` đã dùng `~/App.jsx` và `~/theme.js`.
- `src/App.jsx` đã dùng `~/pages/Boards/_id`.
- `src/pages/Boards/_id.jsx` áp dụng rõ cả hai quy ước: absolute path cho component ngoài module board, relative path cho `BoardBar` và `BoardContent`.

Comment đáng chú ý:
- Comment trong `src/pages/Boards/_id.jsx` không chỉ giải thích cách viết import, mà thực chất đang ghi lại một coding convention cho toàn repo.

### Buổi 8 - 2026-03-24 - Dựng header cơ bản và đưa menu MUI vào App Bar

Nguồn đối chiếu:
- Commit `9ee8325` - `code header khung cơ bản`
- Merge commit `b96cdac` - merge nhánh `Code-Header-AppBar`
- File chính: `src/components/AppBar/index.jsx`, `src/components/AppBar/Menu/WorkSpace.jsx`, `src/components/AppBar/Menu/Recent.jsx`, `src/components/AppBar/Menu/Starred.jsx`, `src/components/AppBar/Menu/Templates.jsx`, `src/components/AppBar/Menu/Profiles.jsx`, `src/theme.js`, `vite.config.js`, `package.json`, `nhat_ky_hoc_trello/setup.txt`
- Asset liên quan: `src/assets/trello-icon.svg`, `img_layout/app_bar.png`
- Comment liên quan trong code ở toàn bộ cụm `src/components/AppBar/**`

Mình đã học được:
- `AppBar` được nâng từ một thanh trống chỉ chứa `ModeSelect` thành header có cấu trúc rõ ràng: cụm trái cho điều hướng và nhận diện thương hiệu, cụm phải cho search, đổi mode, thông báo, trợ giúp và tài khoản.
- Dự án dùng `vite-plugin-svgr` để import SVG như React component, sau đó render bằng `SvgIcon`. Đây là một bước rất thực tế để dùng icon riêng mà vẫn đi theo hệ sinh thái MUI.
- `AppBar` đang học theo kiểu “lấy khung từ docs MUI rồi ráp lại thành giao diện Trello”. Điều này thể hiện rất rõ qua các comment như “Dùng docs có sẵn của Menu trong MUI lib”, “API endIcon”, “Sử dụng MenuItem”.
- `theme.trello` được cập nhật lại kích thước `appBarHeight` và `boardBarHeight`, nghĩa là khi header trở nên thực hơn thì token layout cũng phải cập nhật tương ứng.
- File `setup.txt` được thêm vào thư mục nhật ký để lưu môi trường và các package cài đặt nền. Đây là một dạng “bối cảnh học tập dài hạn” rất có ích.

Cách code và cách làm việc rút ra:
- Khi dựng một phần UI lớn như header, nên tách từng cụm menu thành component riêng như `WorkSpace`, `Recent`, `Starred`, `Templates`, `Profiles`. Cách này giữ cho `AppBar/index.jsx` chỉ làm nhiệm vụ bố cục và lắp ghép.
- Học theo docs tốt nhất là không copy nguyên khối rồi bỏ đó, mà gắn comment để biết mình đang mượn pattern nào, API nào, và dùng nó vào đâu trong dự án thật.
- Việc đổi từ `@vitejs/plugin-react-swc` sang `@vitejs/plugin-react` kèm `@emotion/babel-plugin` cho thấy khi dùng MUI/Emotion sâu hơn thì đôi lúc cần chọn plugin phù hợp hơn với stack styling hiện tại.
- Thêm file `setup.txt` là một bài học về cách lưu bối cảnh môi trường ngay trong repo. Khi học kéo dài nhiều buổi, việc nhớ “đã cài gì, vì sao cài” quan trọng không kém nhớ code.

Điều mình cần nhớ:
- Header không chỉ là phần nhìn thấy đầu tiên, mà còn là nơi gom nhiều pattern UI nhỏ: menu mở/đóng, icon custom, badge, tooltip, avatar menu, input search, switch theme.
- `anchorEl -> open -> handleClick / handleClose` là flow nền tảng của rất nhiều component menu trong MUI. Một khi nắm được pattern này thì có thể tái sử dụng cho dropdown khác trong app.
- SVG riêng của dự án nên được đưa vào pipeline build sớm để về sau dùng logo, icon domain-specific thuận lợi hơn.

Việc tiếp theo:
- Làm cho các menu bớt dữ liệu demo, thay bằng nội dung gắn với ngữ cảnh Trello thật.
- Tiếp tục dựng `Board Bar` và `Board Content` chi tiết hơn để header không còn đứng một mình.
- Khi bắt đầu có data thật, cần nối tiếp flow từ UI interaction của menu/search sang state và API.

Code quan trọng:

```jsx
import SvgIcon from '@mui/material/SvgIcon'
import { ReactComponent as TrelloIcon } from '~/assets/trello-icon.svg'

<SvgIcon component={TrelloIcon} inheritViewBox sx={{ color: 'primary.main' }} />
```

```jsx
<Box px={2} sx={{ height: (theme) => theme.trello.appBarHeight, display: 'flex', justifyContent: 'space-between' }}>
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
    <WorkSpace />
    <Recent />
    <Starred />
    <Templates />
  </Box>

  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
    <TextField label="Search..." type="search" size="small" />
    <ModeSelect />
    <Profile />
  </Box>
</Box>
```

```jsx
const [anchorEl, setAnchorEl] = React.useState(null)
const open = Boolean(anchorEl)

const handleClick = (event) => {
  setAnchorEl(event.currentTarget)
}

const handleClose = () => {
  setAnchorEl(null)
}
```

Luồng chạy end-to-end hiện tại:
- `main.jsx` bọc app bằng `CssVarsProvider` để toàn bộ header dùng chung theme và mode hiện tại.
- `App.jsx` render `Board`.
- `src/pages/Boards/_id.jsx` render `AppBar` trước, rồi tới `BoardBar` và `BoardContent`.
- `AppBar/index.jsx` chia giao diện thành 2 cụm trái/phải.
- Mỗi menu như `WorkSpace`, `Recent`, `Templates`, `Profiles` tự quản lý state mở/đóng bằng `anchorEl`.
- Người dùng click vào button hoặc avatar -> `handleClick` lấy `event.currentTarget` -> `open` chuyển sang `true` -> `Menu` mở ra tại đúng vị trí anchor.
- Khi đóng menu -> `handleClose` set `anchorEl` về `null` -> `open` thành `false`.
- Riêng `ModeSelect` vẫn giữ flow cũ: người dùng đổi lựa chọn -> `setMode(...)` cập nhật color scheme toàn app -> header đổi màu theo theme hiện tại.

Cách dùng đã được áp dụng trong dự án:
- `src/components/AppBar/index.jsx` đang là nơi áp dụng kiến thức bố cục header, chia khối trái/phải và dùng token chiều cao từ `theme.trello`.
- Cụm `src/components/AppBar/Menu/*.jsx` áp dụng pattern menu chuẩn từ MUI docs vào các dropdown của thanh đầu trang.
- `vite.config.js`, `package.json` và `src/assets/trello-icon.svg` cùng phối hợp để hỗ trợ icon SVG riêng của dự án.
- `nhat_ky_hoc_trello/setup.txt` lưu lại môi trường ban đầu và các package nền như MUI, Yarn, Vite, `vite-plugin-svgr`.

Comment đáng chú ý:
- Comment “Dùng docs có sẵn của Menu trong MUI lib” lặp lại ở nhiều file menu. Điều này rất đáng giữ vì nó cho thấy rõ nguồn học và cũng nhắc mình rằng phần hiện tại là khung học tập, chưa phải business UI cuối cùng.
- Comment “API endIcon để thêm icon vào cuối cùng button” là ví dụ tốt cho kiểu ghi chú ngắn nhưng bám đúng API đang học.

## Tổng kết giai đoạn dựng layout và header

Từ sau giai đoạn theme mode, dự án đã đi tiếp theo một lộ trình rất hợp lý:

1. Dựng skeleton của trang board.
2. Tách cấu trúc page/component để giảm độ phình của `App.jsx`.
3. Chuẩn hóa import để code dễ đọc khi số file tăng lên.
4. Bắt đầu dựng `AppBar` thật với nhiều pattern UI nhỏ ghép lại.

Điều mình học được rõ nhất trong giai đoạn này là:
- Theme tốt không chỉ quản màu mà còn quản token layout.
- Structure tốt giúp flow của app hiện ra rõ hơn: `main.jsx` -> `App.jsx` -> `pages/Boards/_id.jsx` -> các component con.
- Comment tốt không cần dài, nhưng nên nói rõ “đang học API nào”, “mượn từ docs nào” và “đã áp dụng vào đâu trong dự án”.
- Khi học dự án thật, nên lưu cả môi trường cài đặt, ảnh layout mẫu, commit và code snippet vào chung một mạch nhật ký để lần sau mở lại không bị mất ngữ cảnh.
