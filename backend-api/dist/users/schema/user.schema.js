"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.User = exports.Role = exports.UserType = exports.Gender = void 0;
const mongoose_1 = require("@nestjs/mongoose");
var Gender;
(function (Gender) {
    Gender["MALE"] = "Male";
    Gender["FEMALE"] = "Female";
    Gender["OTHER"] = "Other";
})(Gender || (exports.Gender = Gender = {}));
var UserType;
(function (UserType) {
    UserType["NORMAL"] = "normal";
    UserType["VIP"] = "vip";
})(UserType || (exports.UserType = UserType = {}));
var Role;
(function (Role) {
    Role["PATIENT"] = "Patient";
    Role["DOCTOR"] = "Doctor";
    Role["NURSE"] = "Nurse";
})(Role || (exports.Role = Role = {}));
let User = class User {
    user_id;
    full_name;
    date_of_birth;
    gender;
    phone;
    email;
    address;
    avatar;
    type;
    role;
    created_at;
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)({ unique: true }),
    __metadata("design:type", Number)
], User.prototype, "user_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, maxlength: 100 }),
    __metadata("design:type", String)
], User.prototype, "full_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], User.prototype, "date_of_birth", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: Gender }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, mongoose_1.Prop)({ maxlength: 20 }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ maxlength: 100 }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ maxlength: 255 }),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: UserType, default: UserType.NORMAL }),
    __metadata("design:type", String)
], User.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Role }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], User.prototype, "created_at", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
exports.UserSchema.index({ email: 1 }, { name: 'idx_user_email' });
exports.UserSchema.pre('save', async function (next) {
    if (this.isNew) {
        const UserModel = this.constructor;
        const lastUser = await UserModel.findOne({}, {}, { sort: { 'user_id': -1 } });
        this.user_id = lastUser ? lastUser.user_id + 1 : 1;
    }
    next();
});
//# sourceMappingURL=user.schema.js.map