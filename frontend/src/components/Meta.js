import { Helmet } from 'react-helmet';

const Meta = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: '遊戲王卡店',
  description: '銷售遊戲王卡及周邊商品',
};

export default Meta;
