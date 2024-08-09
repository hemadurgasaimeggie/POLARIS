import { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import StoreContext from '@pega/react-sdk-components/lib/bridge/Context/StoreContext';
import createPConnectComponent from '@pega/react-sdk-components/lib/bridge/react_pconnect';
import { SdkConfigAccess, loginIfNecessary, getAvailablePortals } from '@pega/auth/lib/sdk-auth-manager';
import { compareSdkPCoreVersions } from '@pega/react-sdk-components/lib/components/helpers/versionHelpers';
import { theme } from './theme';

declare const myLoadPortal: any;
declare const myLoadDefaultPortal: any;
declare const PCore:any;
export default function FullPortal() {
    
  
  const [portalSelectionScreen, setPortalSelectionScreen] = useState(false);
  const [defaultPortalName, setDefaultPortalName] = useState('');
  const [availablePortals, setAvailablePortals] = useState<string[]>([]);
  /**
   * kick off the application's portal that we're trying to serve up
   */
  function startPortal() {
    // NOTE: When loadMashup is complete, this will be called.
    PCore.onPCoreReady(renderObj => {
      // Check that we're seeing the PCore version we expect
      compareSdkPCoreVersions();
console.log(renderObj);
      // Initialize the SdkComponentMap (local and pega-provided)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      // getSdkComponentMap(localSdkComponentMap).then((theComponentMap: any) => {
      //   // eslint-disable-next-line no-console
      //   console.log(`SdkComponentMap initialized`);

      //   // Don't call initialRender until SdkComponentMap is fully initialized
      //   initialRender(renderObj);
      // });
    });

    // load the Portal and handle the onPCoreEntry response that establishes the
    //  top level Pega root element (likely a RootContainer)

    const { appPortal: thePortal, excludePortals } = SdkConfigAccess.getSdkConfigServer();
    const defaultPortal = PCore?.getEnvironmentInfo?.().getDefaultPortal?.();
    const queryPortal = sessionStorage.getItem('rsdk_portalName');

    // Note: myLoadPortal and myLoadDefaultPortal are set when bootstrapWithAuthHeader is invoked
    if (queryPortal) {
      myLoadPortal('root', queryPortal, []);
    } else if (thePortal) {
      // eslint-disable-next-line no-console
      console.log(`Loading specified appPortal: ${thePortal}`);
      myLoadPortal('root', thePortal, []);
    } else if (myLoadDefaultPortal && defaultPortal && !excludePortals.includes(defaultPortal)) {
      // eslint-disable-next-line no-console
      console.log(`Loading default portal`);
      myLoadDefaultPortal('root', []);
    } else {
      // eslint-disable-next-line no-console
      console.log('Loading portal selection screen');
      setPortalSelectionScreen(true);
      setDefaultPortalName(defaultPortal);
      // Getting current user's access group's available portals list other than excluded portals (relies on Traditional DX APIs)
      getAvailablePortals().then(portals => {
        setAvailablePortals(portals as string[]);
      });
    }
  }

  function loadSelectedPortal(portal) {
    setPortalSelectionScreen(false);
    myLoadPortal('root', portal, []); // this is defined in bootstrap shell that's been loaded already
  }
  function doRedirectDone() {
    // history(window.location.pathname);
    let localeOverride: any = sessionStorage.getItem('rsdk_locale');
    if (!localeOverride) {
      localeOverride = undefined;
    }
    // appName and mainRedirect params have to be same as earlier invocation
    loginIfNecessary({ appName: 'portal', mainRedirect: true, locale: localeOverride });
  }

  // One time (initialization)
  useEffect(() => {
    document.addEventListener('SdkConstellationReady', () => {
      // start the portal
      startPortal();
    });
    let localeOverride: any = sessionStorage.getItem('rsdk_locale');
    if (!localeOverride) {
      localeOverride = undefined;
    }
    // Login if needed, doing an initial main window redirect
    loginIfNecessary({
      appName: 'portal',
      mainRedirect: true,
      redirectDoneCB: doRedirectDone,
      locale: localeOverride
    });
  }, []);

  return (
    // <div>djjd</div>
    <div id='root' />
  );
}
