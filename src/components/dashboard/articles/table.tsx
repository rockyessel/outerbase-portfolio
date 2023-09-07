import React from 'react';
import { MdOutlineMoreVert } from 'react-icons/md';
import { ArticleItem } from '@/interface';
import AudioBox from './audio-box';

interface Props {
  data?: ArticleItem[];
  loading?: boolean;
  headers?: string[];
}

const Table = (props: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const tools = props.data?.map((tool) => tool.tags.split(',').map((t) => t.trim()));
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)
  const Dropdown = ({ isDropdownOpen }: { isDropdownOpen: boolean }) =>
    isDropdownOpen && (
      <div className='absolute right-10 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow'>
        <ul>
          <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
            Option 1
          </li>
          <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
            Option 2
          </li>
          <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
            Option 3
          </li>
        </ul>
      </div>
    );

  return (
    <table className='min-w-full divide-y divide-rose-700'>
      <thead className='bg-transparent'>
        <tr>
          {props.headers?.map((header, index) => (
            <th
              key={index}
              className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right'
            >
              <button
                type='button'
                className='flex items-center gap-x-3 focus:outline-none'
              >
                <span>{header}</span>
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className='bg-transparent divide-y divide-rose-700'>
        {props.loading ? (
          <tr className='relative h-10'>
            <td
              className='absolute inset-0 px-4 text-sm font-medium whitespace-nowrap'
              colSpan={100}
              rowSpan={100}
            >
              <span className='py-2.5 text-center w-full inline-flex items-center justify-center'>
                Loading...
              </span>
            </td>
          </tr>
        ) : props.data && props.data.length > 0 ? (
          props.data?.map((data, index) => (
            <tr key={index}>
              <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                <div className='flex items-start'>
                  <h2 title={data?.title} className='font-medium'>
                    {data?.title.length > 15
                      ? `${data?.title.slice(0, 15)}...`
                      : data?.title}
                  </h2>
                </div>
              </td>
              <td className='px-12 py-4 text-sm font-medium whitespace-nowrap'>
                {data.is_published === 1 ? (
                  <p>Published</p>
                ) : (
                  <p>Not Published</p>
                )}
              </td>
              <td className='px-12 py-4 text-sm font-medium whitespace-nowrap'>
                {data.views_count}
              </td>

              <td className='px-4 py-4 text-sm whitespace-nowrap'>
                <span className='inline-flex items-center gap-2'>
                  {tools ? (
                    tools[0].map((tool, index) => (
                      <p
                        key={index}
                        className='inline px-3 py-1 text-sm font-normal rounded-full gap-x-2 bg-emerald-100/60'
                      >
                        {tool}
                      </p>
                    ))
                  ) : (
                    <p>No Tags</p>
                  )}
                </span>
              </td>
              <td className='px-4 py-4 text-sm whitespace-nowrap'>
                {data.comments_count}
              </td>
              <td className='px-4 py-4 text-sm whitespace-nowrap'>
                <AudioBox source='' />
              </td>
              <td className='px-4 py-4 text-sm whitespace-nowrap relative'>
                <button
                  onClick={toggleDropdown}
                  title='Edit'
                  className='px-1 py-1 transition-colors duration-200 rounded-lg hover:bg-gray-100'
                >
                  <MdOutlineMoreVert />
                </button>
                <Dropdown isDropdownOpen={isDropdownOpen} />
              </td>
            </tr>
          ))
        ) : (
          <tr className='relative h-10'>
            <td
              className='absolute inset-0 px-4 text-sm font-medium whitespace-nowrap'
              colSpan={100}
              rowSpan={100}
            >
              <span className='py-2.5 text-center w-full inline-flex items-center justify-center'>
                No Data Yet
              </span>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
