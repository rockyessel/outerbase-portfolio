import { ArticleMetaDataProps } from '@/pages/dashboard/articles';
import { getImageURL } from '@/utils/api-request';
import { createSlug } from '@/utils/function';
import React, { RefObject } from 'react';

interface Props {
  showMetaDataDrawer: boolean;
  setShowMetaDataDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  // set: React.Dispatch<React.SetStateAction<ArticleMetaDataProps | undefined>>;
  // value: any;
  setMetaDataDrawerRef: (ref: RefObject<any>) => void;
}

const MetaDataDrawer = (props: Props) => {
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

  // console.log('props.value: ', props.value);

  // Function to gather all the data from the component
  const getAllData = () => {
    console.log('titleValue:', titleValue);
    console.log('imageURL:', imageURL);
    console.log('totalTags:', totalTags);
    console.log('dateAndTimeValue:', dateAndTimeValue);
    console.log('descriptionValue:', descriptionValue);
    console.log('slugValue:', slugValue);

    return {
      title: titleValue,
      image: imageURL,
      tags: totalTags,
      publication_date: dateAndTimeValue,
      description: descriptionValue,
      slug: slugValue,
      // Add more fields as needed
    };
  };

  // Pass the ref back to the parent component
  if (metaDataDrawerRef.current) {
    props.setMetaDataDrawerRef(metaDataDrawerRef);
  }

  // Rest of your component JSX here

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

  const handleFileUploads = async () => {
    if (selectedFile) {
      const imgURL = await getImageURL(selectedFile);
      setImageURL(imgURL);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file);
  };

  const updateParentState = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const data = {
      title: titleValue,
      image: imageURL,
      tags: tagsInString,
      publication_date: dateAndTimeValue,
      description: descriptionValue,
      slug: slugValue,
      keywords,
      // Add more fields as needed
    };

    console.log('data: ', data);
    console.log('imageURL: ', imageURL);
  };

  React.useEffect(() => {
    setSlugValue(
      titleValue.toLowerCase().replaceAll(' ', '-').replaceAll("'", '')
    );
  }, [titleValue]);

  return (
    <React.Fragment>
      {props.showMetaDataDrawer === true ? null : (
        <fieldset className='text-center'>
          <button
            className='flex items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
            type='button'
            onClick={() =>
              props.setShowMetaDataDrawer((previousState) => !previousState)
            }
          >
            Metadata
          </button>
        </fieldset>
      )}

      {props.showMetaDataDrawer === true && (
        //<fieldset className='sticky top-0 w-full flex items-center bg-[rgba(0,0,0,0.06)] backdrop-blur-lg gap-4 justify-between px-4 py-1.5 '>
        <aside className='relative z-[100] md:w-[30rem]'>
          <form className='shadow shadow-rose-500 float-right h-screen overflow-y-auto flex flex-col gap-2 w-full'>
            <button
              className='pt-10'
              type='button'
              onClick={() =>
                props.setShowMetaDataDrawer((previousState) => !previousState)
              }
            >
              Close
            </button>

            <fieldset className='w-full px-4 py-2'>
              <p>Article Tittle</p>
              <fieldset>
                <fieldset className='w-full'>
                  <input
                    type='text'
                    value={titleValue}
                    onChange={(event) => setTitleValue(event.target.value)}
                    title='Article Tittle'
                    placeholder='Article Tittle'
                    className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
                  />
                </fieldset>
              </fieldset>
            </fieldset>

            <fieldset className='w-full px-4 py-2'>
              <p>Post Metadata</p>
              <fieldset>
                <fieldset className='flex items-center justify-center w-full'>
                  {!selectedFile ? (
                    <label className='flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50'>
                      <fieldset className='flex flex-col items-center justify-center pt-5 pb-6'>
                        <svg
                          className='w-8 h-8 mb-4 text-gray-500'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 20 16'
                        >
                          <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                          />
                        </svg>
                        <p className='mb-2 text-sm text-gray-500'>
                          <span className='font-semibold'>Click to upload</span>{' '}
                          or drag and drop
                        </p>
                        <p className='text-xs text-gray-500'>
                          SVG, PNG, JPG or GIF (MAX. 1200x600px)
                        </p>
                      </fieldset>
                      <input
                        title='File'
                        onChange={handleFileChange}
                        type='file'
                        className='hidden'
                      />
                    </label>
                  ) : (
                    <fieldset className='w-full h-40 flex flex-col border-rose-800 gap-2.5 border-dashed border-2 items-center justify-center rounded-lg'>
                      <button
                        className='inline-flex items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
                        onClick={handleFileUploads}
                        type='button'
                      >
                        <svg
                          className='w-4 h-4'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 20 16'
                        >
                          <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                          />
                        </svg>{' '}
                        Upload Now
                      </button>
                      <button
                        className='flex items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
                        type='button'
                      >
                        Cancel Upload
                      </button>
                    </fieldset>
                  )}
                </fieldset>
              </fieldset>
            </fieldset>

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
                          <span className='leading-relaxed truncate px-1'>
                            {tag}
                          </span>
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

            <fieldset className='w-full px-4 py-2'>
              <fieldset>
                <p>Published on</p>
                <span className='text-xs text-gray-400'>
                  You can also post on a previous date.
                </span>
              </fieldset>

              <fieldset className='w-full px-4 py-2'>
                <input
                  title='Datetime'
                  value={dateAndTimeValue}
                  onChange={(event) => setDateAndTimeValue(event.target.value)}
                  type='datetime-local'
                  className='w-full py-1.5 px-4 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
                  placeholder='Enter'
                />
              </fieldset>
            </fieldset>

            <fieldset className='w-full px-4 py-2'>
              <p>Caption</p>

              <fieldset>
                <form className='w-full'>
                  <input
                    type='text'
                    // className='w-full bg-white text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
                    placeholder='Enter'
                    className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
                  />
                </form>
              </fieldset>
            </fieldset>

            <fieldset className='w-full px-4 py-2'>
              <p>Post URL</p>
              <fieldset>
                <fieldset className='inline-flex flex-col items-center gap-1'>
                  <input
                    type='text'
                    value={slugValue}
                    onChange={(event) => setSlugValue(event.target.value)}
                    className='block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
                    placeholder='Enter some tags'
                  />
                  <p className='text-sm text-gray-600'>{`https://bloggkie.vercel.app/blog/${slugValue}`}</p>
                </fieldset>
              </fieldset>
            </fieldset>

            <fieldset className='w-full px-4 py-2'>
              <p>Description</p>

              <label>
                <textarea
                  value={descriptionValue}
                  onChange={(event) => setDescriptionValue(event.target.value)}
                  placeholder='Write a description for your title...'
                  title='Description'
                  className='block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
                ></textarea>
              </label>
            </fieldset>

            <fieldset className='w-full px-4 py-2 flex items-center gap-2 pb-10'>
              <button
                onClick={updateParentState}
                type='submit'
                className='flex items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
              >
                Save Metadata
              </button>
            </fieldset>
          </form>
        </aside>
      )}
    </React.Fragment>
  );
};

export default MetaDataDrawer;
