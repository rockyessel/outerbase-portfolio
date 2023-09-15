import { createSlug } from '@/utils/function';
import React from 'react';


interface Props {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}

const MetadataTags = (props:Props) => {
  const [selectedFile, setSelectedFile] = React.useState<File>();
  const [imageURL, setImageURL] = React.useState<string>('');
  const [totalTags, setTotalTags] = React.useState<string[]>([]);
  const [tagValue, setTagValue] = React.useState<string>('');
  const [dateAndTimeValue, setDateAndTimeValue] = React.useState<string>('');
  const [descriptionValue, setDescriptionValue] = React.useState<string>('');
  const [categoryValue, setCategoryValue] = React.useState<string>('');
  const [slugValue, setSlugValue] = React.useState<string>('');
  const [titleValue, setTitleValue] = React.useState<string>('');
  const [keywords, setKeywords] = React.useState<string>('');
  const [tagsInString, setTagsInString] = React.useState<string>('');
  const metaDataDrawerRef = React.useRef<any>(null);

  const handleRemoveTag = (tagValue: string) => {
    const removedTags = totalTags.filter((tag) => tag !== tagValue);
    setTotalTags(removedTags);
  };
  console.log('Keyword String: ', keywords);

  const handleAddTags = (tagValue: string) => {
    const formattedTags = createSlug(tagValue);
    setTotalTags((tags) => [...tags, formattedTags]);
    const keywordArr = totalTags.map((tag) =>
      tag.replaceAll('-', ' ').replaceAll("'", '')
    );
    const keywordInString = keywordArr.join(',');
    const tagInString = totalTags.join(',');
    setTagsInString(tagInString);
    setKeywords(keywordInString);
    setTagValue('');
  };

  return (
    <fieldset className='w-full px-4 py-2'>
      <p>Tags</p>
      <fieldset>
        <fieldset className=''>
          <fieldset className='flex flex-col gap-2'>
            <fieldset className='inline-flex items-center gap-2'>
              <input
                type='text'
                value={tagValue}
                onChange={(event) => setTagValue(event.target.value)}
                className='block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
                placeholder='Enter some tags'
              />

              <button
                onClick={() => handleAddTags(tagValue)}
                type='button'
                className='flex items-center justify-center w-fit px-5 py-2 text-sm capitalize transition-colors duration-200 bg-transparent border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:bg-rose-800 hover:text-white hover:border-rose-200 active:ring-2 active:ring-rose-700'
              >
                Add
              </button>
            </fieldset>

            <ul className='flex flex-wrap gap-2'>
              {totalTags?.map((tag, index) => (
                <li
                  key={index}
                  className='bg-transparent inline-flex items-center text-sm rounded overflow-hidden border border-rose-600 w-fit'
                >
                  <span className='leading-relaxed truncate px-1'>{tag}</span>
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    title={`Remove ${tag}`}
                    type='button'
                    className='w-6 h-8 inline-block align-middle bg-rose-600 focus:outline-none'
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </fieldset>
        </fieldset>
      </fieldset>
    </fieldset>
  );
};

export default MetadataTags;
