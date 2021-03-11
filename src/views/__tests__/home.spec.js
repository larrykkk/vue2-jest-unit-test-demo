import { mount, RouterLinkStub } from "@vue/test-utils";
import Home from "../Home";
import flushPromises from "flush-promises";

let mockError = false;

jest.mock("axios", () => ({
  get: (_url, _data) => {
    return new Promise((resolve, reject) => {
      if (mockError) {
        throw Error();
      }

      if (_data) {
        resolve({
          data: [
            {
              id: 1,
              name: "Mrs. Dennis Schulist",
            },
            {
              id: 2,
              name: "Nicholas Runolfsdottir V",
            },
            {
              id: 3,
              name: "b",
            },
          ],
        });
      } else {
        resolve({
          data: [],
        });
      }
    });
  },
}));

describe("home.vue", () => {
  it("收到正確參數以後就會得到資料，並且將 user.name.length > 17 的名字改成紅色", async () => {
    const wrapper = mount(Home, {
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    await wrapper.vm.getData({ data: "foo" });
    await flushPromises();
    expect(wrapper.findAll("a.red").length).toBe(2);
  });

  it("沒帶參數拿到 0 筆資料，就會顯示找不到資料", async () => {
    const wrapper = mount(Home, {
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    await wrapper.vm.getData();
    await flushPromises();
    expect(wrapper.text()).toMatch("找不到資料");
  });

  it("當 axios 請求捕獲錯誤時，將會拋出錯誤", async () => {
    const wrapper = mount(Home, {
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    const spyError = jest.spyOn(wrapper.vm, "error");

    mockError = true;

    await wrapper.vm.getData();
    await wrapper.vm.$nextTick();
    expect(spyError).toHaveBeenCalled();
  });
});
