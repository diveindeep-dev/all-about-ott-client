import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpApi } from '../../api';
import { emailRegex, passwordRegex, nameRegex } from '../../utils/regex';

interface SignUpValue extends SignInValue {
  name: string;
  passwordConfirm: string;
}

const initialValue: SignUpValue = {
  name: '',
  mail: '',
  password: '',
  passwordConfirm: '',
};

function SignUp() {
  const [values, setValues] = useState<SignUpValue>(initialValue);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setError(''), 2000);
  }, [error]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { mail, name, password, passwordConfirm } = values;

    if (!mail || !name || !password || !passwordConfirm) {
      return setError('모든 항목을 입력해주세요.');
    }
    if (password !== passwordConfirm) {
      return setError('비밀번호가 일치하지 않습니다.');
    }
    if (!emailRegex.test(mail)) {
      return setError('이메일 형식이 유효하지 않습니다.');
    }
    if (!passwordRegex.test(password)) {
      return setError(
        '비밀번호는 8자리 이상, 숫자와 문자가 1자리 이상 포함되어야 합니다.',
      );
    }
    if (!nameRegex.test(name)) {
      return setError('이름은 최소 2자리 최대 10자리 가능합니다.');
    }

    const user: SignUpUser = {
      mail,
      name,
      password,
    };

    const result = await signUpApi(user);

    if (result) {
      if (result.status === 201) {
        navigate('/signin');
      } else {
        setError(result.data.message);
        setValues(initialValue);
      }
    } else {
      setError(`서버가 불안정합니다. 다시 시도해주세요.`);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="mail"
          placeholder="mail"
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
        />
        <input
          type="password"
          name="passwordConfirm"
          placeholder="password confirm"
          onChange={handleChange}
        />
        <div>{error}</div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
