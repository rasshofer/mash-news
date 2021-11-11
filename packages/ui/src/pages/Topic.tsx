import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useInterval from '@use-it/interval';
import { Spinner } from '../components/Spinner';
import { fetchTopic, Topic as TopicType } from '../services/topics';
import { Grid } from '../components/Grid';

export const Topic: FC = () => {
  const { topicId = 'everything' } = useParams<{
    topicId?: string;
  }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [topic, setTopic] = useState<TopicType | undefined>();

  const fetchData = async () => {
    const item = await fetchTopic(topicId);
    setTopic(item);
    setIsLoading(false);
  };

  useInterval(() => {
    fetchData();
  }, 60 * 1000);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId]);

  return isLoading ? <Spinner /> : topic ? <Grid items={topic.items} /> : null;
};
