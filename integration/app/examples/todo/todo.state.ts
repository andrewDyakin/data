import { Injectable } from '@angular/core';
import { action, payload, Persistence, StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsDataRepository } from '@ngxs-labs/data/repositories';
import { Immutable } from '@ngxs-labs/data/typings';
import { State } from '@ngxs/store';

@Persistence()
@StateRepository()
@State<string[]>({
    name: 'todo',
    defaults: []
})
@Injectable()
export class TodoState extends NgxsDataRepository<string[]> {
    @action()
    public addTodo(@payload('todo') todo: string): void {
        if (todo) {
            this.ctx.setState((state: Immutable<string[]>): Immutable<string[]> => state.concat(todo));
        }
    }

    @action()
    public removeTodo(@payload('idx') idx: number): void {
        this.ctx.setState(
            (state: Immutable<string[]>): Immutable<string[]> =>
                state.filter((_: string, index: number): boolean => index !== idx)
        );
    }
}
