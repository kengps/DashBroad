import { ConsoleSqlOutlined } from "@ant-design/icons";
import { listCases } from "../../api/case";
import md5 from "md5";

export const notiAllCaseCount = async () => {
  let lc = await listCases();
  localStorage.notiAllCaseCount = lc.data.length
};

export const notiWaitCaseCount = async () => {
  let lc = await listCases();
  let lcwc = lc.data.filter((item) => {
    return item.status == "รอการแก้ไข";
  });
  localStorage.notiWaitCaseCount = lcwc.length;
};

export const notiAll = () => {
  localStorage.noti = null;
  notiAllCaseCount();
  notiWaitCaseCount();
};

export const notiMD5 = () => {
  let nmd5 = md5(
    JSON.stringify([
      localStorage.notiAllCaseCount,
      localStorage.notiWaitCaseCount,
    ])
  );
  return nmd5;
};

export const notiDetail = () => {
  let n = {
    notiAllCaseCount: localStorage.notiAllCaseCount,
    notiWaitCaseCount: localStorage.notiWaitCaseCount,
  };
  return n;
};
