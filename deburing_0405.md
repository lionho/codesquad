# debugging 기술문서 정리

## breakpoints란

- 어떤 시점에서 어떤 값이 세팅되는지 확인하고 소스의 동작방식을 이해하기 위해 사용

- 스크립트의 동작을 잠시 멈추도록 하는 것. 이때 원하는 위치에 중단점을 설정하여야 함.

- vscode의 Debug => 단축키 F9 눌러 설정

    - Step over : 단축키 F10 - 다음 함수 코드로 이동
    - Step into : 단축키 F11 - 함수의 내부 코드로 이동
    - Step out : 단축키 F11 + Shift -  현재 함수에서 빠져나와 다음 함수로 이동

## call stack

여러 함수들을 호출하는 스크립트에서 해당 위치를 추적하는 인터프리터.

현재 어떤 함수가 동작하고 있는지, 그 함수 내에서 어떤 함수가 동작하는지, 다음에 어떤 함수가 호출되어야 하는지 등을 제어

- 스크립트가 함수를 호출하면 인터프리터는 이를 호출 스택에 추가한 다음 함수 실행 시작

- 해당 함수에 의해 호출되는 모든 함수는 호출 스택에 추가되고 호출이 도달하는 위치에서 실행

- 메인 함수가 끝나면 인터프리터는 스택을 제거하고 메인 코드 목록에서 중단된 실행 다시 시작
 
## watch사용법

- Add Expression 변수를 추가하면 breakpoint에 도달할 때마다 해당 변수의 값을 빠르게 찾을 수 있음.

# Node.js 개발환경에 대해

- require : a.js 모듈을 b.js에서 쓰고 싶을 때 a.js에서 require 해줌으로써 b.js에 대한 접근이 가능.

```js
//a. js
const name = require('./b.js');
console.log(circle.circumference(3));
```

- exports : exports는 public의 개념. 내가 보여주고 싶은 메서드나 변수만 내보낼 수 있게 된다.

```js
//b.js
const { PI } = Math;
exports.circumference = (r) => 2 * PI * r;
```
