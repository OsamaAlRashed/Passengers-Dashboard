import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { $_themeConfig } from "@themeConfig";
import store from "@/store"
export class OrderHub {
  connection= null;
  startedPromise = null;
  manuallyClosed = false;
  startSignalR = () => {
    const accessToken = localStorage.getItem("AccessToken")
    this.connection = new HubConnectionBuilder()
      .withUrl(`${$_themeConfig.app.domainPath}orderHub`, {
        accessTokenFactory: () => `${accessToken}`,
      })
      .configureLogging(LogLevel.Information)
      .build();
      
      this.connection.on("UpdateAdminOrders", (value) => {
        console.log("sds")
        store.commit('Get_Orders', value)
      });
      
    const start = () => {
      this.startedPromise = this.connection.start().catch((err) => {
        console.error("Failed to connect with hub", err);
        return new Promise((resolve, reject) =>
          setTimeout(() => start().then(resolve).catch(reject), 5000)
        );
      });
      return this.startedPromise;
    };
    this.connection.onclose(() => {
      if (!this.manuallyClosed) start();
    });

    // Start everything
    this.manuallyClosed = false;
    start();

    return this.connection;
  };
  stopSignalR = () => {
    if (!this.startedPromise) return;

    this.manuallyClosed = true;
    return this.startedPromise
      .then(() => this.connection.stop())
      .then(() => {
        this.startedPromise = null;
      });
  };
};