import { mount, RouterLinkStub } from "@vue/test-utils";
import Home from "../Home";
import flushPromises from "flush-promises";

let mockError = false;

jest.mock("axios", () => ({
  get: (_url, _data) => {
    return new Promise((resolve) => {
      if (mockError) {
        throw Error();
      }

      resolve({
        data: [
          {
            id: 1,
            name: "Leanne Graham",
          },
        ],
      });
    });
  },
}));

describe("home.vue", () => {
  it("當呼叫 getData 應該在畫面上渲染出使用者資料", async () => {
    const wrapper = mount(Home, {
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    wrapper.vm.getData();
    await flushPromises();
    expect(wrapper.findAll("li").length).toBe(1);
  });

  it("當 axios 請求捕獲錯誤時，將會拋出錯誤", async () => {
    const wrapper = mount(Home, {
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    mockError = true;

    const spyError = jest.spyOn(wrapper.vm, "error");
    await wrapper.vm.getData();
    await wrapper.vm.$nextTick();

    await expect(spyError).toHaveBeenCalled();
  });
});
