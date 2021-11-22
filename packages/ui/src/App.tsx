import { FC, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';

import { Topic } from './pages/Topic';
import { Navigation } from './fragments/Navigation';
import { Spinner } from './components/Spinner';
import { Skeleton } from './components/Skeleton';
import { Logo } from './components/Logo';
import { fetchConfig, ConfigContext, Config } from './services/config';
import logo from './assets/img/logo.png';

import './App.scss';

const formatBuildDate = (built: string): string => {
  const date = new Date(built);
  const diff = Math.ceil(Math.max(Date.now() - date.getTime(), 0) / 1000 / 60);
  return `~${diff} minute${diff === 1 ? '' : 's'}`;
};

const ScrollToTop: FC = () => {
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export const App: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [config, setConfig] = useState<Config>();

  const fetchInitialData = async () => {
    const categories = await fetchConfig();
    setConfig(categories);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <div className="app">
      {isLoading ? (
        <Spinner />
      ) : (
        <ConfigContext.Provider value={config}>
          <Router>
            <ScrollToTop />
            <Skeleton
              header={<Logo url={logo} />}
              nav={<Navigation />}
              main={
                <Switch>
                  <Route exact path="/" component={Topic} />
                  <Route exact path="/:topicId" component={Topic} />
                </Switch>
              }
              footer={
                <>
                  <p>
                    Mash News is a mashup of the best sites on the internet
                    aggregated for busy people. All rights to the content remain
                    with the linked authors.
                  </p>
                  {config?.built ? (
                    <p>Last update was {formatBuildDate(config.built)} ago.</p>
                  ) : null}
                </>
              }
            />
          </Router>
        </ConfigContext.Provider>
      )}
    </div>
  );
};
