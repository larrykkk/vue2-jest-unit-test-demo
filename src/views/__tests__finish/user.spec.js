import { mount } from "@vue/test-utils";
import UserInfo from "../UserInfo";
import flushPromises from "flush-promises";

jest.mock("axios", () => ({
  get: (_url, _data) => {
    if (_url.includes("/users")) {
      return Promise.resolve({
        data: {
          id: 1,
          name: "larrykkk",
          email: "larrykkk@april.biz",
          phone: "1-770-736-8031 x56442",
          website: "larrykkk.org",
        },
      });
    }
  },
  post: (_url, _data) => {
    return Promise.resolve({
      data: {
        id: 1,
        isLiked: !_data.isLiked,
      },
    });
  },
}));

describe("home.vue", () => {
  it('將會渲染跟 API 回傳will find same amount "li" when pass data', async () => {
    const $route = {
      params: { id: 1 },
    };

    const wrapper = mount(UserInfo, {
      mocks: {
        $route,
      },
    });

    await flushPromises();
    expect(wrapper.text()).toMatch("larrykkk");
    expect(wrapper.text()).toMatch("larrykkk@april.biz");
    expect(wrapper.text()).toMatch("1-770-736-8031 x56442");
    expect(wrapper.text()).toMatch("larrykkk.org");
  });

  it("當對使用者按下喜歡之後，打 API 回來以後按鈕狀態改變", async () => {
    const $route = {
      params: { id: 1 },
    };

    const wrapper = mount(UserInfo, {
      mocks: {
        $route,
      },
      data() {
        return {
          isLike: false,
        };
      },
    });

    await wrapper.vm.like();
    await flushPromises();
    expect(wrapper.find("button").text()).toBe("dislike");
  });
});
