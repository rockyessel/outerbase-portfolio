import React from 'react'
import moment from 'moment';
import Image from 'next/image';
import { ArticleItem } from '@/interface';
import ShareButton from '../global/share-button';

interface Props {
    data: ArticleItem
}

const ArticleDetailedCard = (props:Props) => {
    return (
      <React.Fragment>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <h1 className='font-extrabold max_screen:text-4xl text-7xl capitalize'>
              {props.data?.title}
            </h1>

            <ShareButton text={props.data?.title} />
            <p className='font-medium inline-flex items-center gap-5 max_screen:text-xs'>
              <span>{moment(props.data?.publishedDatetime).format('MMM Do YY')}</span>
              <span>4 Minutes</span>
            </p>
          </div>

          <div>
            <Image
              className='w-full rounded-md mb-4 shadow-md'
              src={props.data?.image}
              width={1000}
              height={1000}
              alt={props.data?.title}
            />
          </div>
        </div>
      </React.Fragment>
    );
}

export default ArticleDetailedCard