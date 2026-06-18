import { describe, expect, it } from "vitest";
import { SALES_TEAM } from "./salesTeam";

// 期望的销售经理联系信息（按用户提供的权威数据）
const EXPECTED = [
  {
    name: "丁筱雨",
    email: "dingxiaoyu@cnopendata.com",
    phone: "13370290605",
    wechat: "CnOpenData-dxy",
    qrCode: "/manus-storage/qr_dingxiaoyu_424531cf.png",
  },
  {
    name: "王诗薇",
    email: "wangshiwei@cnopendata.com",
    phone: "19101735809",
    wechat: "CnOpenData-wsw",
    qrCode: "/manus-storage/qr_wangshiwei_4eb4d23a.png",
  },
  {
    name: "孙潇琦",
    email: "sunxiaoqi@cnopendata.com",
    phone: "19121071287",
    wechat: "CnOpenData-sxq",
    qrCode: "/manus-storage/qr_sunxiaoqi_9d340e2c.png",
  },
  {
    name: "杨宝璐",
    email: "yangbaolu@cnopendata.com",
    phone: "17720481357",
    wechat: "CnOpenData-ybl",
    qrCode: "/manus-storage/qr_yangbaolu_93b3912e.png",
  },
  {
    name: "陈郝雨",
    email: "belle@cnopendata.com",
    phone: "13396097252",
    wechat: "CnOpenData-chy",
    qrCode: "/manus-storage/qr_chenhaoyu_dc546338.png",
  },
];

describe("SALES_TEAM 销售联系信息映射", () => {
  it("应包含五位销售经理", () => {
    expect(SALES_TEAM).toHaveLength(5);
  });

  it("展示顺序应为：孙潇琦、丁筱雨、杨宝璐、王诗薇、陈郝雨", () => {
    expect(SALES_TEAM.map((p) => p.name)).toEqual([
      "孙潇琦",
      "丁筱雨",
      "杨宝璐",
      "王诗薇",
      "陈郝雨",
    ]);
  });

  it("每位销售经理的姓名/邮箱/电话/二维码/微信号应一一对应正确", () => {
    EXPECTED.forEach((expected) => {
      const person = SALES_TEAM.find((p) => p.name === expected.name);
      expect(person, `未找到销售经理 ${expected.name}`).toBeDefined();
      expect(person!.email).toBe(expected.email);
      expect(person!.phone).toBe(expected.phone);
      expect(person!.wechat).toBe(expected.wechat);
      expect(person!.qrCode).toBe(expected.qrCode);
    });
  });

  it("id 应唯一，避免选中错位", () => {
    const ids = SALES_TEAM.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("邮箱、电话、二维码均应唯一，避免张冠李戴", () => {
    const emails = SALES_TEAM.map((p) => p.email);
    const phones = SALES_TEAM.map((p) => p.phone);
    const qrCodes = SALES_TEAM.map((p) => p.qrCode);
    expect(new Set(emails).size).toBe(emails.length);
    expect(new Set(phones).size).toBe(phones.length);
    expect(new Set(qrCodes).size).toBe(qrCodes.length);
  });

  it("电话号码应为 11 位中国大陆手机号", () => {
    SALES_TEAM.forEach((p) => {
      expect(p.phone).toMatch(/^1\d{10}$/);
    });
  });

  it("邮箱应为 cnopendata.com 域名", () => {
    SALES_TEAM.forEach((p) => {
      expect(p.email).toMatch(/@cnopendata\.com$/);
    });
  });
});
