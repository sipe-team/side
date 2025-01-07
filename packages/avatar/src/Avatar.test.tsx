import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import { expect, test, describe, it } from "vitest";
import { Avatar } from "./Avatar";
import type { AvatarShape, AvatarSize } from "./Avatar";

const testImage = faker.image.avatar();

test("Avatar 컴포넌트가 주입받은 이미지 주소를 src 속성으로 설정한다.", () => {
  render(<Avatar src={testImage} alt="대체 텍스트" />);

  const img = screen.getByRole("img");
  expect(img).toHaveAttribute("src", testImage);
});

test("이미지가 없을 경우 대체 텍스트를 표시한다.", () => {
  render(<Avatar alt="대체 텍스트" />);

  expect(screen.getByText("대체 텍스트")).toBeInTheDocument();
});

test("이미지 로드 실패 시 fallback을 표시한다.", () => {
  render(
    <Avatar
      src="broken-link"
      fallback="https://randomuser.me/api/portraits/women/1.jpg"
    />
  );

  const img = screen.getByRole("img");
  img.dispatchEvent(new Event("error"));

  expect(img).toHaveAttribute(
    "src",
    "https://randomuser.me/api/portraits/women/1.jpg"
  );
});

describe("Avatar 컴포넌트", () => {
  const sizes: { size: AvatarSize; expectedSize: string }[] = [
    { size: "xs", expectedSize: "24px" },
    { size: "sm", expectedSize: "32px" },
    { size: "md", expectedSize: "40px" },
    { size: "lg", expectedSize: "70px" },
    { size: "xl", expectedSize: "96px" },
  ];

  const shapes: { shape: AvatarShape; expectedRadius: string }[] = [
    { shape: "circle", expectedRadius: "50%" },
    { shape: "rounded", expectedRadius: "4px" },
    { shape: "square", expectedRadius: "0px" },
  ];

  it.each(sizes)(
    "size가 $size일때 $expectedSize x $expectedSize 크기로 렌더링 된다.",
    ({ size, expectedSize }) => {
      render(<Avatar src={testImage} size={size} />);
      const container = screen.getByRole("img").parentElement;
      expect(container).toHaveStyle({
        width: expectedSize,
        height: expectedSize,
      });
    }
  );

  it.each(shapes)(
    "shape가 $shape일때 borderRadius는 $expectedRadius로 나타난다.",
    ({ shape, expectedRadius }) => {
      render(<Avatar src={testImage} shape={shape} />);
      const container = screen.getByRole("img").parentElement;
      expect(container).toHaveStyle({ borderRadius: expectedRadius });
    }
  );
});

// test('기본 크기는 40px이다.', () => {
//   render(<Avatar src={testImage} />);
//   expect(screen.getByRole('img')).toHaveStyle({
//     width: '40px',
//     height: '40px',
//   });
// });

// test('원형 형태로 표시한다.', () => {
//   render(<Avatar src={testImage} shape="circle" />);
//   expect(screen.getByRole('img')).toHaveStyle({ borderRadius: '50%' });
// });
