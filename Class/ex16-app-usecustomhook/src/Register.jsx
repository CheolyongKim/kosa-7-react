import { useInput } from "./useInput"

export default function MultiInput() {

    const printName = (val) => console.log("이름: ", val);
    const printEmail = (val) => console.log("이메일: ", val);
    const printPhone = (val) => console.log("전화번호: ", val);

    const [name, onNameChange, submitName] = useInput("", printName);
    const [email, onEmailChange, submitEmail] = useInput("", printEmail);
    const [phone, onPhoneChange, submitPhone] = useInput("", printPhone);

    return (
        <div style={{ padding: 20 }}>
            <h3>여러 개 Input 예제</h3>
            <div>
                <input
                    value={name}
                    placeholder="이름 입력"
                    onChange={onNameChange}
                />
                <button onClick={submitName}>확인</button>
            </div>
            <div>
                <input
                    value={email}
                    placeholder="이메일 입력"
                    onChange={onEmailChange}
                />
                <button onClick={submitEmail}>확인</button>
            </div>
            <div>
                <input
                    value={phone}
                    placeholder="전화번호 입력"
                    onChange={onPhoneChange}
                />
                <button onClick={submitPhone}>확인</button>
            </div>
        </div>
    )
}