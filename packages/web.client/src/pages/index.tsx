import type { NextPage } from 'next';
import tw from 'twin.macro';

const message = 'hello';

const HomePage: NextPage = () => <div css={tw`text-yellow-100 bg-black`}>{message}</div>;

export default HomePage;
