---
to: <%= path %>/src/<%= componentName %>.tsx
---
interface <%= componentName %>Props {
  // props 타입을 정의하세요
}

export function <%= componentName %>({
  ...props
}: <%= componentName %>Props) {
  return (
    <div {...props}>
      <%= componentName %> 컴포넌트
    </div>
  );
}